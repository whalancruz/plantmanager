using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Entitys
{
    [Table("Frequencys")]
    public class FrequencysEntity : BaseEntity
    {
        [Required]
        public string Title { get; set; }

        public ICollection<PlantsFrequencysEntity> PlantsFrequencysEntity { get; set; } 
    }

}