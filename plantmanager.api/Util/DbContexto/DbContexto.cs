using Entitys;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Util.EntitiesConfigurations;

public class DbContexto : DbContext
{
    private readonly IConfiguration _configuration;
    public DbContexto(DbContextOptions<DbContexto> options, IConfiguration configuration) : base(options)
    {
        _configuration = configuration;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new PlantsFrequencysConfiguration());
        modelBuilder.ApplyConfiguration(new PlantsEnvironmentsConfiguration());
        modelBuilder.ApplyConfiguration(new PlantsConfiguration());
        modelBuilder.ApplyConfiguration(new FrequencysConfiguration());
        modelBuilder.ApplyConfiguration(new EnvironmentsConfiguration());
        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
        }
    }
    public DbSet<EnvironmentsEntity> Environments { get; set; }
    public DbSet<FrequencysEntity> Frequencys { get; set; }
    public DbSet<PlantsFrequencysEntity> PlantsFrequencys { get; set; }
    public DbSet<PlantsEnvironmentsEntity> PlantsEnvironments { get; set; }

}
