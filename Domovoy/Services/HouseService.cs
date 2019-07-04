using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using DBRepository.Repositories;
using Domovoy.Helpers.Geo;
using Domovoy.ViewModels;
using Microsoft.EntityFrameworkCore.Internal;
using Models;

namespace Domovoy.Services
{
    public class HouseService : IHouseService
    {
        private readonly IHouseRepository _houseRepository;
        private readonly IMapper _mapper;

        public HouseService(IHouseRepository houseRepository, IMapper mapper)
        {
            _houseRepository = houseRepository;
            _mapper = mapper;
        }

        public async Task<List<HouseGeoViewModel>> GetHouses()
        {
            var houses = await _houseRepository.GetHouses();

            using (WebClient wc = new WebClient())
            {
                using (System.IO.StreamWriter file =
                    new System.IO.StreamWriter(@"D:\6.txt"))
                {
                    var c = 0;
                    foreach (var h in houses)
                    {
                        if (!h.Address.StartsWith("г. Самара, Кировский")) continue;

                        var url = $"https://geocode-maps.yandex.ru/1.x/?format=json&apikey=0f21bfb6-f5c3-4931-a9ee-244137ca2c46&geocode={h.Address}";
                        var json = wc.DownloadString(url);
                        try
                        {
                            var geoData = GeoManager.GetJsonGeoData(json);
                            file.WriteLine(
                                $"UPDATE Houses SET PosX = {geoData.Pos[0]}, PosY = {geoData.Pos[1]}, LowerCornerX = {geoData.LowerCorner[0]}, LowerCornerY = {geoData.LowerCorner[1]}, UpperCornerX = {geoData.UpperCorner[0]}, UpperCornerY = {geoData.UpperCorner[1]} WHERE HouseId = {h.HouseId}");

                        }
                        catch (Exception ex)
                        {
                            Console.Error.WriteLine($"EXCEPTION {ex.Message} {h.HouseId}");
                        }

                        
                        c++;
                    }

                }
            }

            return houses.Select(h => _mapper.Map<House, HouseGeoViewModel>(h)).ToList();
        }

        public List<HouseAddressViewModel> GetHousesByAddress(string address, int count)
        {
            if (address == "" || count == 0)
                return new List<HouseAddressViewModel>();
            var houses = _houseRepository.GetHousesByAddress(address, count);
            return houses.Select(h => _mapper.Map<House, HouseAddressViewModel>(h)).ToList();
        }

        public async Task<HouseViewModel> GetHouse(int id)
        {
            var house = await _houseRepository.GetHousesById(id);
            return _mapper.Map<House, HouseViewModel>(house);
        }
       
    }
}