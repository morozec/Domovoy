using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("HouseViolations")]
    public class HouseViolation
    {
        [Key]
        public int HouseViolationId { get; set; }

        public int HouseId { get; set; }

        /// <summary>
        /// Описание нарушения/предписания
        /// </summary>
        public string ViolationDescriptions { get; set; } 

        /// <summary>
        /// Дата нарушения/предписания
        /// </summary>
        public string ViolationDate { get; set; }

        [ForeignKey("HouseId")]
        public House House { get; set; }
    }
}
