using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Entitys
{
    [Table("Plants")]
    public class PlantsEntity : BaseEntity
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string About { get; set; }

        [Required]
        public string Water_tips { get; set; }

        [Required]
        public string Photo { get; set; }

        public ICollection<PlantsEnvironmentsEntity> PlantsEnvironmentsEntity { get; set; }
        public ICollection<PlantsFrequencysEntity> PlantsFrequencysEntity { get; set; } 
    }
}