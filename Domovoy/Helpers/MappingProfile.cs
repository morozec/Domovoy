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
            CreateMap<House, HouseGeoViewModel>();
                //.ForMember(dest => dest.GeoData,
                //    opt => opt.MapFrom(source => GeoManager.GetGeoData(source.Address)));
            CreateMap<HouseGeoViewModel, House>();

            CreateMap<Organization, OrganizationViewModel>();
            CreateMap<OrganizationViewModel, Organization>();

            CreateMap<OrganizationType, OrganizationTypeViewModel> ();
            CreateMap<OrganizationTypeViewModel, OrganizationType>();
        }

    }
}