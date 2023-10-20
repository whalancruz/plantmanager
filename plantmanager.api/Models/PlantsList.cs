
using System.Collections.Generic;

namespace Models
{
    public class PlantsList
    {
        public long? Id { get; set; }
        public string? Name { get; set; }
        public string? About { get; set; }
        public string? Water_tips { get; set; }
        public string? Photo { get; set; }
        public List<string>? Environments { get; set; }
        public Frequency? Frequency { get; set; }
    }
}