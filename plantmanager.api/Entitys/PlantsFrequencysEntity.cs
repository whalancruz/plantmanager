using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Entitys
{
    [Table("PlantsFrequencys")]
    public class PlantsFrequencysEntity : BaseEntity
    {

        [Required]
        public int? Times { get; set; }

        [Required]
        public long PlantId { get; set; }

        [Required]
        public long FrequencyId { get; set; }

        [ForeignKey("PlantId")]
        public PlantsEntity PlantsEntity { get; set; }

        [ForeignKey("FrequencyId")]
        public FrequencysEntity FrequencysEntity { get; set; }

    }
}