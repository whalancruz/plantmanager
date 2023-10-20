
namespace Models
{
    public class PlantsListaParametros
    {
        public string? sort { get; set; }
        public int pageSize { get; set; } = 10;
        public int pageAtual { get; set; } = 1;        
        public string? filter { get; set; }     
    }
}