using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Entitys;

namespace Util.EntitiesConfigurations
{
    public class FrequencysConfiguration : BaseConfiguration<FrequencysEntity>
    {
        public new void Configure(EntityTypeBuilder<FrequencysEntity> builder)
        {
            builder.ToTable("Frequencys");
            builder.HasKey(p => p.Id);
            builder.Property(x => x.Title);
        }
    }
}