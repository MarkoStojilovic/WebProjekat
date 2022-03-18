using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Models
{
    [Table("Bioskop")]
    public class Bioskop
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [RegularExpression(@"\w+")]
        [Required]
        [Column("Naziv")]
        [MaxLength(50)]
        public string Naziv { get; set; }

        public List<Sala> Sale { get; set; }
    }
}