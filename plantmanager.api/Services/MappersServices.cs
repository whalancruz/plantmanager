
using System.Collections.Generic;
using System.Linq;
using Entitys;
using Interfaces.Services;
using Models;

namespace Services
{
    public class MappersServices : IMappersServices
    {

        public List<string>? MapEnvironments(ICollection<PlantsEnvironmentsEntity> plantsEnvironmentsEntity)
        {
            if (plantsEnvironmentsEntity == null || !plantsEnvironmentsEntity.Any()) return null;

            List<string> retorno = new List<string>();

            foreach (var element in plantsEnvironmentsEntity) retorno.Add(element.EnvironmentsEntity.Key);

            return retorno;
        }

        public Frequency? MapFrequency(ICollection<PlantsFrequencysEntity> plantsFrequencysEntities)
        {
            if (plantsFrequencysEntities == null || !plantsFrequencysEntities.Any()) return null; 

            var frequencysEntity = plantsFrequencysEntities.First().FrequencysEntity;

            Frequency frequency = new Frequency
            {
                Times = plantsFrequencysEntities.First().Times,
                Repeat_every = frequencysEntity.Title
            };

            return frequency;
        }

    }
}