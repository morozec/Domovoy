using AutoMapper;
using Domovoy.Helpers.Geo;
using Domovoy.ViewModels;
using Models;

namespace Domovoy.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<House, HouseViewModel>();
            CreateMap<House, HouseAddressViewModel>();
            CreateMap<House, HouseGeoViewModel>();

            CreateMap<Organization, OrganizationViewModel>();
            CreateMap<OrganizationViewModel, Organization>();

            CreateMap<OrganizationType, OrganizationTypeViewModel> ();
            CreateMap<OrganizationTypeViewModel, OrganizationType>();
        }

    }
}