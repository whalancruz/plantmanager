using System.Collections.Generic;
using Entitys;
using Models;
using Services;

namespace Interfaces.Services
{
    public interface IMappersServices 
    {
        List<string>? MapEnvironments(ICollection<PlantsEnvironmentsEntity> plantsEnvironmentsEntity);
        Frequency? MapFrequency(ICollection<PlantsFrequencysEntity> plantsFrequencysEntities);
    }
}