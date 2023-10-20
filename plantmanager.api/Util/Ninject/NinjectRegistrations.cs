
using System;
using AutoMapper;
using Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Ninject;
using Ninject.Modules;
using Services;


namespace Util.Ninject
{
    public class NinjectRegistrations : NinjectModule
    {
        public override void Load()
        {

            Bind<IMapper>().ToMethod(ctx =>
            {
                var mappersServices = ctx.Kernel.Get<IMappersServices>();
                var profile = new Mappers(mappersServices);

                var mapperConfiguration = new MapperConfiguration(cfg =>
                {
                    cfg.AddProfile(profile);
                });

                return mapperConfiguration.CreateMapper();
            }).InSingletonScope();

            Bind<IMappersServices>().To<MappersServices>().InSingletonScope();
            Bind<IConfiguration>().ToConstant(new ConfigurationBuilder().SetBasePath(AppDomain.CurrentDomain.BaseDirectory).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true).Build());
            Bind<IPlantsServices>().To<PlantsServices>();
            Bind<IPlantsFrequencysServices>().To<PlantsFrequencysServices>();
            Bind<IPlantsEnviromentsServices>().To<PlantsEnviromentsServices>();
            Bind<IFrequencysServices>().To<FrequencysServices>();
            Bind<IEnvironmentsServices>().To<EnvironmentsServices>();

        }
    }

}