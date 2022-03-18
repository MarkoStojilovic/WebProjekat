using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace Models
{
    [Table("Sedista")]
    public class Sedista
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Red")]
        [Range(1,15)]
        public int BrojReda{ get; set; }
        
        [Column("Sediste")]
        [Range(1,210)]
        public int BrojSedista{ get; set; }

        [JsonIgnore]
        public Rezervacija Rezervacija { get; set; }
    }
}