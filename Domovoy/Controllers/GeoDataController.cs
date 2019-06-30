using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using DBRepository.Repositories;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Domovoy.Controllers
{
    [Route("api/[controller]")]
    public class GeoDataController : Controller
    {
        private readonly IHouseRepository _houseRepository;

        public GeoDataController(IHouseRepository houseRepository)
        {
            _houseRepository = houseRepository;
        }

        public const string API_KEY = "0f21bfb6-f5c3-4931-a9ee-244137ca2c46";
        [HttpGet("[action]/{address}")]
        public string GetGeoData(string address)
        {
            using (WebClient wc = new WebClient())
            {
                var url = $"https://geocode-maps.yandex.ru/1.x/?format=json&apikey={API_KEY}&geocode={address}";
                var json = wc.DownloadString(url);
                return json;
            }
        }

        [HttpGet("[action]/{id}")]
        public async Task<House> GetHouse(int id)
        {
            var house = await _houseRepository.GetHousesById(id);
            return house;
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


    }
}
