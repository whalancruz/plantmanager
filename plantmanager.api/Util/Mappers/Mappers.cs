using AutoMapper;
using Entitys;
using Interfaces.Services;
using Models;

namespace Util
{
    public class Mappers : Profile
    {
        private readonly IMappersServices _mappersServices; // Injete a implementação do serviço aqui

        public Mappers(IMappersServices mappersServices)
        {
            _mappersServices = mappersServices;

            CreateMap<PlantsEntity, PlantsList>().ForMember(dest => dest.Frequency, opt => opt.MapFrom(src => _mappersServices.MapFrequency(src.PlantsFrequencysEntity))).ForMember(dest => dest.Environments, opt => opt.MapFrom(src => _mappersServices.MapEnvironments(src.PlantsEnvironmentsEntity)));
            CreateMap<EnvironmentsEntity, EnvironmentsList>();
        
        }

    }
}