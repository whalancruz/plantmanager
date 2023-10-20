using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entitys
{
    [Table("PlantsEnvironments")]
    public class PlantsEnvironmentsEntity : BaseEntity
    {
        [Required]
        public long PlantId { get; set; }

        [Required]
        public long EnvironmentId { get; set; }

        [ForeignKey("PlantId")]
        public PlantsEntity PlantsEntity { get; set; }

        [ForeignKey("EnvironmentId")]
        public EnvironmentsEntity EnvironmentsEntity { get; set; }

    }
}