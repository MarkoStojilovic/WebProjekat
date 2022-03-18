using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Models
{
    [Table("Rezervacija")]
    public class Rezervacija
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Cena")]
        public string Cena{ get; set; } 

        public Projekcija Projekcija { get; set; }

        public Gledalac Gledalac { get; set; }

        public List<Sedista> RezervacijaSedista { get; set; }
    }
}