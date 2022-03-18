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
    public class RezervacijaController : ControllerBase
    {
        public BioskopContext BioskopContext { get; set; }

        public RezervacijaController(BioskopContext context)
        {
            BioskopContext = context;
        }

        [Route("PreuzmiRezervacije/{IDprojekcije}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiRezervacije(int IDprojekcije)
        {
             if(IDprojekcije <= 0)
            {
                return BadRequest("Nevalidan id projekcije!");
            }
            try
            {
                var r = await BioskopContext.Projekcije.Where(p => p.ID == IDprojekcije)
                .Include(p => p.Rezervacije)
                .ThenInclude(q => q.RezervacijaSedista)
                .ToListAsync();

                var rezervacija = r.Select(p =>
                p.Rezervacije.Select(q =>
                q.RezervacijaSedista.Select(s =>
                new
                {
                    BrojSedista = s.BrojSedista
                }
                ))).ToList();
                return Ok(rezervacija);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DodajRezervaciju/{IDProjekcije}/{IDGledaoca}")]
        [HttpPost]
        public async Task<ActionResult> DodajRezervaciju(int IDProjekcije, int IDGledaoca, [FromBody] int[] RedoviISedista)
        {
            if(IDProjekcije <= 0)
            {
                return BadRequest("Nevalidan ID Projekcije!");
            }

            if(IDGledaoca <= 0)
            {
                return BadRequest("Nevalidan ID Gledaoca!");
            }

            try
            {
                var projekcija = await BioskopContext.Projekcije.FindAsync(IDProjekcije);
                var gledalac = await BioskopContext.Gledaoci.FindAsync(IDGledaoca);
                int cena = (RedoviISedista.Length/2)*300;

                Rezervacija r = new Rezervacija
                {
                    Cena = cena.ToString()+"RSD",
                    Projekcija = projekcija,
                    Gledalac = gledalac
                };
                BioskopContext.Rezervacije.Add(r);
               
                int j=RedoviISedista.Length/2;
                for(int i=0; i<RedoviISedista.Length/2; i++)
                {
                    Sedista s = new Sedista
                    {
                        Rezervacija = r,
                        BrojReda = RedoviISedista[i],
                        BrojSedista = RedoviISedista[j]
                    };
                    BioskopContext.Sedista.Add(s);
                    j++;
                }
                await BioskopContext.SaveChangesAsync();
                var rezervacija = new 
                {
                    ID = r.ID,
                    Cena = r.Cena
                };
                return Ok(rezervacija);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzmeniRezervaciju/{IDRezervacije}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniRezervaciju(int IDRezervacije, [FromBody] int[] RedoviISedista)
        {
            if(IDRezervacije <= 0)
            {
                return BadRequest("Nevalidan ID!");
            }

            var r = BioskopContext.Rezervacije.Where(r => r.ID == IDRezervacije).FirstOrDefault();

            if(r == null)
            {
                return BadRequest("Rezervacija ne postoji!");
            }
            
            else
            {
                try
            {
                var rezervacija = await BioskopContext.Rezervacije.FindAsync(IDRezervacije);
                int i=0; //prva polovina niza sadrzi redove
                int j=RedoviISedista.Length/2; //druga polovina niza sadrzi sedista
                foreach(var rs in BioskopContext.Sedista.Where(p => p.Rezervacija.ID == IDRezervacije))
                {
                    rs.BrojReda = RedoviISedista[i];
                    rs.BrojSedista = RedoviISedista[j];
                    BioskopContext.Sedista.Update(rs);
                    i++;
                    j++;
                }

                await BioskopContext.SaveChangesAsync();
                return Ok("Rezervacija je izmenjena");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            }
        }

        [Route("ObrisiRezervaciju/{IDRezervacije}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiRezervaciju(int IDRezervacije)
        {
            if(IDRezervacije <= 0)
            {
                return BadRequest("Nevalidan ID!");
            }

            var r = BioskopContext.Rezervacije.Where(p => p.ID == IDRezervacije).FirstOrDefault();

            if(r == null)
            {
                return BadRequest("Rezervacija ne postoji!");
            }

            else
            {
                try
                {
                    var rezervacija = await BioskopContext.Rezervacije.FindAsync(IDRezervacije);
                    foreach(var rez in BioskopContext.Sedista.Where(p => p.Rezervacija.ID == IDRezervacije))
                    {
                        BioskopContext.Sedista.Remove(rez);
                    }

                    BioskopContext.Rezervacije.Remove(rezervacija);
                    await BioskopContext.SaveChangesAsync();
                    return Ok("Rezervacija je izbrisana");
                }
                catch (Exception e)
                {
                    return BadRequest(e.Message);
                }
            }
        }
    }
}