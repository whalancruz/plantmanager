using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Ninject;
using Util.Ninject;

namespace Plantmanager
{
    public class Startup
    {
        public IConfiguration _configuration { get; }

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            AddDatabase(services);
            AddNinject(services);
            AddSwagger(services);

            services.AddAutoMapper(typeof(Startup));
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Minha API v1");
                options.RoutePrefix = string.Empty; // Para acessar o Swagger UI na raiz do projeto
                options.DisplayRequestDuration(); // Opcional: exibe a duração das requisições no Swagger UI
                options.OAuthAppName("plantmanager"); // Substitua pelo nome da sua API
            });

            app.UseRouting();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }

        public virtual void AddDatabase(IServiceCollection services)
        {
            services.AddDbContext<DbContexto>(options => options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection")));
        }

        public virtual void AddNinject(IServiceCollection services)
        {
            var kernel = new StandardKernel();
            kernel.Load(new NinjectRegistrations());
            services.AddSingleton<IKernel>(kernel);
        }

        public virtual void AddSwagger(IServiceCollection services)
        {

            // Configurar o Swagger
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "PlantManager", Version = "v1" });

                // Configurar a autenticação JWT no Swagger
                var securityScheme = new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                };

                options.AddSecurityDefinition("Bearer", securityScheme);
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                   {
                     new OpenApiSecurityScheme
                     {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] { }
                    }
                });
            });

        }

    }

}