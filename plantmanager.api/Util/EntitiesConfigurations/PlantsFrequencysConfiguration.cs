using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Entitys;

namespace Util.EntitiesConfigurations
{
    public class PlantsFrequencysConfiguration : BaseConfiguration<PlantsFrequencysEntity>
    {
        public new void Configure(EntityTypeBuilder<PlantsFrequencysEntity> builder)
        {
            builder.ToTable("PlantsFrequencys");
            builder.HasKey(pf => new { pf.PlantId, pf.FrequencyId });
            builder.Property(x => x.Times);
            builder.Property(p => p.PlantId);
            builder.Property(p => p.FrequencyId);
            builder.HasOne(pf => pf.PlantsEntity).WithMany(p => p.PlantsFrequencysEntity).HasForeignKey(pf => pf.PlantId);
            builder.HasOne(pf => pf.FrequencysEntity).WithMany(f => f.PlantsFrequencysEntity).HasForeignKey(pf => pf.FrequencyId);
        }
    }
}