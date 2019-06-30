using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("Auctions")]
    public class Auction
    {
        [Key]
        public int AuctionId { get; set; }

        [ForeignKey("House")]
        public int HouseId { get; set; }

        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }

        public string Status { get; set; }

        [NotMapped]
        public string DateStartStr
        {
            get
            {
                return DateStart.ToShortDateString();
            }
        }

        [NotMapped]
        public string DateEndStr
        {
            get
            {
                return DateEnd.ToShortDateString();
            }
        }
    }
}
