using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBRepository.Factories;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository.Repositories
{
    public class HouseRepository : BaseRepository, IHouseRepository
    {
        public HouseRepository(string connectionString, IDomovoyContextFactory domovoyContextFactory) : base(
            connectionString, domovoyContextFactory)
        {
        }

        public async Task<List<House>> GetHouses()
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Houses.ToListAsync();
            }
        }

        public List<House> GetHousesByAddress(string address, int count)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                var splitAddresses = address.ToLower().Split(" ");

                var housesList = new List<House>();
                foreach (var h in context.Houses)
                {
                    var hAddress = h.Address.ToLower();
                    if (splitAddresses.All(sa => hAddress.Contains(sa)))
                        housesList.Add(h);
                    if (housesList.Count >= count) break;
                }
               
                return housesList;
            }
        }

        public async Task<House> GetHousesById(int id)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Houses
                    .Include(e => e.UK)
                    .SingleOrDefaultAsync(h => h.HouseId == id);
            }
        }

        public async Task<List<HouseViolation>> GetHouseViolations(int id)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.HouseViolations
                    .Where(e => e.HouseId == id)
                    .OrderByDescending(e => e.ViolationDate)
                    .ToListAsync();
            }
        }

        public async Task<Auction> GetAuction(int id)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Auctions
                    .SingleOrDefaultAsync(e => e.HouseId == id);
            }
        }

        public async Task<List<AuctionBid>> GetAuctionBids (int id)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.AuctionBids
                    .Include(e => e.Organization)
                    .Include(e => e.Auction)
                    .Where(e => e.Auction.HouseId == id)
                    .ToListAsync();
            }
        }

        public async Task<List<HouseWork>> GetHouseWorks(int id)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.HouseWorks
                    .Where(e => e.HouseId == id)
                    .OrderByDescending(e => e.WorkDate)
                    .ToListAsync();
            }
        }
    }
}
