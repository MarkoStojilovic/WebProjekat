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
    public class BioskopController : ControllerBase
    {
        public BioskopContext BioskopContext { get; set; }

        public BioskopController(BioskopContext context)
        {
            BioskopContext = context;
        }

        [Route("PreuzmiBioskope")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiBioskope()
        {
            try
            {
                var bioskopi = await BioskopContext.Bioskopi
                .Select(b =>
                new
                {
                    ID = b.ID,
                    Naziv = b.Naziv
                }).ToListAsync();
                return Ok(bioskopi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PreuzmiSale")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSale()
        {
            try
            {
                var s1 = await BioskopContext.Sale
                .Include(s => s.Bioskop)
                .ToListAsync();

                var s2 = s1
                .Select(s =>
                new
                {
                    ID = s.ID,
                    Naziv = s.Naziv,
                    BrojRedova = s.BrojRedova,
                    BrojSedista = s.BrojSedista,
                    BioskopID = s.Bioskop.ID
                }).ToList();
                return Ok(s2);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }  
    }
}