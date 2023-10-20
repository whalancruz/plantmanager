using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Entitys;

namespace Util.EntitiesConfigurations
{
    public class PlantsConfiguration : BaseConfiguration<PlantsEntity>
    {
        public new void Configure(EntityTypeBuilder<PlantsEntity> builder)
        {
            builder.ToTable("Plants");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Name);
            builder.Property(x => x.About);
            builder.Property(x => x.Water_tips);
            builder.Property(x => x.Photo);
            builder.HasMany(p => p.PlantsEnvironmentsEntity).WithOne(pe => pe.PlantsEntity).HasForeignKey(pe => pe.PlantId);
        }

    }

}