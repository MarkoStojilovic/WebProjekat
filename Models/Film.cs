using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Film")]
    public class Film
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [RegularExpression(@"\w+")]
        [Required]
        [Column("Naziv")]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [Column("Godina")]
        [Range(2010, 2022)]
        public int Godina{ get; set; }

        [RegularExpression(@"\w+")]
        [Column("Zanr")]
        [MaxLength(20)]
        public string Zanr{ get; set; }

        [RegularExpression(@"\w+")]
        [Column("GlavneUloge")]
        [MaxLength(100)]
        public string GlavneUloge{ get; set; }

        [RegularExpression(@"\w+")]
        [Column("Reziser")]
        [MaxLength(60)]
        public string Reziser{ get; set; }
       
        [Column("DuzinaTrajanja")]
        [MinLength(5)]
        [MaxLength(6)]
        public string Trajanje{ get; set; }

        public List<Projekcija> Projekcije { get; set; }
    }
}