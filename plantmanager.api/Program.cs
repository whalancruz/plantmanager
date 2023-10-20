using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Net;


namespace Plantmanager
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = WebHost.CreateDefaultBuilder(args)
                  .UseContentRoot(Directory.GetCurrentDirectory())
                  .UseStartup<Startup>()
                  .UseKestrel(options =>
                  {
                      options.Listen(IPAddress.Loopback, 5001); // Configura a porta 5001 apenas para localhost
                      options.Listen(IPAddress.Any, 5000); // Configura a porta 5000 em todas as interfaces
                  })
                  .Build();

            host.Run();
        }

    }
}