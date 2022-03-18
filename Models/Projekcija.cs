using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Projekcija")]
    public class Projekcija
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
       
        [Required]
        [Column("DatumProjekcije")]
        public DateTime Datum{ get; set; }

        public Sala Sala { get; set; }

        public List<Rezervacija> Rezervacije { get; set; }

        public Film Film { get; set; }
    }
}