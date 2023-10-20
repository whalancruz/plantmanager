using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Entitys;

namespace Util.EntitiesConfigurations
{
    public class PlantsEnvironmentsConfiguration : BaseConfiguration<PlantsEnvironmentsEntity>
    {
        public new void Configure(EntityTypeBuilder<PlantsEnvironmentsEntity> builder)
        {
            builder.ToTable("PlantsEnvironments");
            builder.HasKey(pe => new { pe.PlantId, pe.EnvironmentId });
            builder.Property(p => p.PlantId);
            builder.Property(p => p.EnvironmentId);
            builder.HasOne(pe => pe.PlantsEntity).WithMany(p => p.PlantsEnvironmentsEntity).HasForeignKey(pe => pe.PlantId);
            builder.HasOne(pe => pe.EnvironmentsEntity).WithMany(e => e.PlantsEnvironmentsEntity).HasForeignKey(pe => pe.EnvironmentId);
        }
    }
}