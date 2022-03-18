using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Models
{
    [Table("Gledalac")]
    public class Gledalac
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [RegularExpression(@"\w+")]
        [Column("Ime")]
        [MaxLength(50)]
        public string Ime{ get; set; }

        [RegularExpression(@"\w+")]
        [Column("Prezime")]
        [MaxLength(50)]
        public string Prezime{ get; set; }

        //[RegularExpression(@"^[a-zA-Z0-9+_.-]+@[a-z]+[.]+[c]+[o]+[m]$")]
        [Column("Email")]
        public string Email{ get; set; }

        public List<Rezervacija> Rezervacije { get; set; }
    }
}