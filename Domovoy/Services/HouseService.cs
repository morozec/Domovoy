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
            return houses.Select(h => _mapper.Map<House, HouseGeoViewModel>(h)).ToList();
        }
    }
}