using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Entitys
{
    [Table("Environments")]
    public class EnvironmentsEntity : BaseEntity
    {
        [Required]
        public string Key { get; set; } 
        
        [Required]
        public string Title { get; set; } 

        public ICollection<PlantsEnvironmentsEntity> PlantsEnvironmentsEntity { get; set; }
    }

}