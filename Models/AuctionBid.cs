using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    [Table("AuctionBids")]
    public class AuctionBid
    {
        [Key]
        public int AuctionBidId { get; set; }

        [ForeignKey("Auction")]
        public int AuctionId { get; set; }

        [ForeignKey("Organization")]
        public int OrganizationId { get; set; }

        public double Cost { get; set; }

        public DateTime DateAdd { get; set; }

        public virtual Auction Auction { get; set; }
        public virtual Organization Organization { get; set; }
    }
}
