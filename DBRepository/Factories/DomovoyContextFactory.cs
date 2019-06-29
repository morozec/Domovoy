using Microsoft.EntityFrameworkCore;

namespace DBRepository.Factories
{
    public class DomovoyContextFactory : IDomovoyContextFactory
    {
        public DomovoyContext CreateDbContext(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DomovoyContext>();
            optionsBuilder.UseSqlServer(connectionString);
            return new DomovoyContext(optionsBuilder.Options);
        }
    }
}