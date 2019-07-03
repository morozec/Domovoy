using System.Collections.Generic;
using System.Threading.Tasks;
using Domovoy.ViewModels;

namespace Domovoy.Services
{
    public interface IHouseService
    {
        Task<List<HouseGeoViewModel>> GetHouses();
        List<HouseAddressViewModel> GetHousesByAddress(string address, int count);
        Task<HouseViewModel> GetHouse(int id);
    }
}