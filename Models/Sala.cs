using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Sala")]
    public class Sala
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Required]
        [Column("Naziv")]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [Column("Redova")]
        [Range(5, 15)]
        public int BrojRedova{ get; set; }
        
        [Column("Sedista")]
        [Range(8, 14)]
        public int BrojSedista{ get; set; }

        public Bioskop Bioskop {get; set ;}

        public List<Projekcija> Projekcije { get; set; }
    }
}