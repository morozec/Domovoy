using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
    public interface IHouseRepository
    {
        Task<List<House>> GetHouses();

        Task<List<House>> GetHousesByAddress(string address, int count);

        Task<House> GetHousesById(int id);

        Task<List<HouseViolation>> GetHouseViolations(int id);

        Task<Auction> GetAuction(int id);

        Task<List<AuctionBid>> GetAuctionBids(int id);

        Task<List<HouseWork>> GetHouseWorks(int id);
    }
}
