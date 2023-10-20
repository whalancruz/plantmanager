using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Entitys;

namespace Util.EntitiesConfigurations
{
    public class EnvironmentsConfiguration : BaseConfiguration<EnvironmentsEntity>
    {
        public new void Configure(EntityTypeBuilder<EnvironmentsEntity> builder)
        {
            builder.ToTable("Environments");
            builder.HasKey(e => e.Id);
            builder.Property(p => p.Id);
            builder.Property(e => e.Key);
            builder.Property(x => x.Title);
            builder.HasMany(e => e.PlantsEnvironmentsEntity).WithOne(pe => pe.EnvironmentsEntity).HasForeignKey(pe => pe.EnvironmentId);
        }
    }
}