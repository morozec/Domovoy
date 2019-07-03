using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using DBRepository.Repositories;
using Domovoy.Services;
using Domovoy.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Domovoy.Controllers
{
    [Route("api/[controller]")]
    public class GeoDataController : Controller
    {
        private readonly IHouseRepository _houseRepository;//TODO: удалить
        private readonly IHouseService _houseService;

        public GeoDataController(IHouseRepository houseRepository, IHouseService houseService)
        {
            _houseRepository = houseRepository;
            _houseService = houseService;
        }
        


        [HttpGet("[action]")]
        public async Task<List<HouseGeoViewModel>> GetHouses()
        {
            var houses = await _houseService.GetHouses();
            return houses;
        }

        [HttpGet("[action]/{id}")]
        public async Task<HouseViewModel> GetHouse(int id)
        {
            var house = await _houseService.GetHouse(id);
            return house;
        }

        [HttpGet("[action]/{address}/{count}")]
        public List<HouseAddressViewModel> GetFirstHousesByAddress(string address, int count)
        {
            var houses = _houseService.GetHousesByAddress(address,count);
            return houses;
        }
        


        [HttpGet("[action]/{id}")]
        public async Task<List<HouseViolation>> GetHouseViolations(int id)
        {
            var violations = await _houseRepository.GetHouseViolations(id);
            return violations;
        }

        [HttpGet("[action]/{id}")]
        public async Task<Auction> GetAuction(int id)
        {
            return await _houseRepository.GetAuction(id);
        }

        [HttpGet("[action]/{id}")]
        public async Task<List<AuctionBid>> GetAuctionBids(int id)
        {
            return await _houseRepository.GetAuctionBids(id);
        }

        [HttpGet("[action]/{id}")]
        public async Task<List<HouseWork>> GetHouseWorks(int id)
        {
            return await _houseRepository.GetHouseWorks(id);
        }

    }
}
