using System.IO;
using DBRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Domovoy
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DomovoyContext>
    {
        public DomovoyContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<DomovoyContext>();
            var connectionString = configuration.GetConnectionString("domovoyConnection");
            builder.UseSqlServer(connectionString);
            return new DomovoyContext(builder.Options);
        }
    }
}