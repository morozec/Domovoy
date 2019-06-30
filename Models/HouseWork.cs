using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("HouseWorks")]
    public class HouseWork
    {
        [Key]
        public int HouseWorkId { get; set; }

        [ForeignKey("House")]
        public int HouseId { get; set; }


        public string WorkName { get; set; }
        public string WorkDate { get; set; }
        public double? FactCost { get; set; }
        public double? FactAmount { get; set; }
        public string AmountMeasure { get; set; }

        public virtual House House { get; set; }
    }
}
