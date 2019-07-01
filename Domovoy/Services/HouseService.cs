using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using DBRepository.Repositories;
using Domovoy.Helpers.Geo;
using Domovoy.ViewModels;
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

        public async Task<List<HouseViewModel>> GetHouses()
        {
            var houses = await _houseRepository.GetHouses();

            //using (WebClient wc = new WebClient())
            //{
            //    using (System.IO.StreamWriter file =
            //        new System.IO.StreamWriter(@"D:\1.txt"))
            //    {
            //        var c = 0;
            //        foreach (var h in houses)
            //        {

            //            var url = $"https://geocode-maps.yandex.ru/1.x/?format=json&apikey=0f21bfb6-f5c3-4931-a9ee-244137ca2c46&geocode={h.Address}";
            //            var json = wc.DownloadString(url);
            //            var geoData = GeoManager.GetJsonGeoData(json);

            //            file.WriteLine(
            //                $"UPDATE Houses SET PosX = {geoData.Pos[0]}, PosY = {geoData.Pos[1]}, LowerCornerX = {geoData.LowerCorner[0]}, LowerCornerY = {geoData.LowerCorner[1]}, UpperCornerX = {geoData.UpperCorner[0]}, UpperCornerY = {geoData.UpperCorner[1]} WHERE HouseId = {h.HouseId}");

            //            c++;
            //        }

            //    }
            //}

            return houses.Select(h => _mapper.Map<House, HouseViewModel>(h)).ToList();
        }
    }
}