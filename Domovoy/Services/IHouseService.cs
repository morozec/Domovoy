using System.Collections.Generic;
using System.Threading.Tasks;
using Domovoy.ViewModels;

namespace Domovoy.Services
{
    public interface IHouseService
    {
        Task<List<HouseViewModel>> GetHouses();
    }
}