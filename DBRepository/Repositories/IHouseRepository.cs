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

        Task<List<House>> GetHousesByAddress(string address);

        Task<House> GetHousesById(int id);

        Task<List<HouseViolation>> GetHouseViolations(int id);

    }
}
