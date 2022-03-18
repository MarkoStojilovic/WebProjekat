using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GledalacController : ControllerBase
    {
        public BioskopContext BioskopContext { get; set; }

        public GledalacController(BioskopContext context)
        {
            BioskopContext = context;
        }

        [Route("DodajGledaoca/{ime}/{prezime}/{email}")]
        [HttpPost]
        public async Task<ActionResult> DodajGledaoca(string ime, string prezime, string email)
        {
            var gledalac = BioskopContext.Gledaoci.Where(g => g.Email == email).FirstOrDefault();
            
            if(gledalac == null)
            {
            if(string.IsNullOrWhiteSpace(ime) || ime.Length > 50 || ime.Any(Char.IsDigit))
            {
                return BadRequest("Nevalidno ime!");
            }

            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length > 50 || prezime.Any(Char.IsDigit))
            {
                return BadRequest("Nevalidno prezime!");
            }

            string pattern = @"^[a-zA-Z0-9+_.-]+@[a-z]+[.]+[c]+[o]+[m]$";
            bool em = Regex.IsMatch(email, pattern);
            if(string.IsNullOrWhiteSpace(email) || em == false)
            {
                return BadRequest("Nevalidan email!");
            }
            
            try
            {
                Gledalac gl = new Gledalac
                {
                    Ime = ime,
                    Prezime = prezime,
                    Email = email
                };
                BioskopContext.Gledaoci.Add(gl);
                await BioskopContext.SaveChangesAsync();
                return Ok(gl.ID);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            }
            else
            {
                return Ok(gledalac.ID);
            }
        }    
    }
}