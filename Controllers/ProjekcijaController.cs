using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjekcijaController : ControllerBase
    {
        public BioskopContext BioskopContext { get; set; }

        public ProjekcijaController(BioskopContext context)
        {
            BioskopContext = context;
        }

        [Route("PreuzmiFilmove")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiFlimove()
        {
            try
            {
                var filmovi = await BioskopContext.Filmovi
                .Select(f =>
                new 
                {
                    ID = f.ID,
                    Naziv = f.Naziv,
                    Godina = f.Godina,
                    Zanr = f.Zanr,
                    GlavneUloge = f.GlavneUloge,
                    Reziser = f.Reziser,
                    Trajanje = f.Trajanje
                }).ToListAsync();
                return Ok(filmovi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiProjekcije")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiProjekcije()
        {
            try
            {
                var pr = await BioskopContext.Projekcije
                .Include(p => p.Sala)
                .Include(p => p.Film)
                .ToListAsync();

                var projekcije = pr
                .Select(p =>
                new 
                {
                    ID = p.ID,
                    Datum = p.Datum,
                    SalaID = p.Sala.ID,
                    FilmID = p.Film.ID
                }).ToList();
                return Ok(projekcije);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiProjekcijeUSali/{salaID}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiProjekcijeUSali(int salaID)
        {
            try
            {
                var pr = await BioskopContext.Projekcije
                .Where(p => p.Sala.ID == salaID)
                .Include(p => p.Sala)
                .Include(p => p.Film)
                .ToListAsync();

                var projekcije = pr.Select(p =>
                new
                {
                    Datum = p.Datum,
                    Naziv = p.Film.Naziv,
                    Godina = p.Film.Godina,
                    Zanr = p.Film.Zanr,
                    GlavneUloge = p.Film.GlavneUloge,
                    Reziser = p.Film.Reziser,
                    Trajanje = p.Film.Trajanje
                }).ToList();
                return Ok(projekcije);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}