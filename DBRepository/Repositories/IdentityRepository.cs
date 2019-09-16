using System.Threading.Tasks;
using DBRepository.Factories;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository.Repositories
{
    public class IdentityRepository : BaseRepository, IIdentityRepository
    {
        public IdentityRepository(string connectionString, IDomovoyContextFactory domovoyContextFactory) : base(connectionString, domovoyContextFactory)
        {
        }

        public async Task<User> GetUser(string userName)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.FirstOrDefaultAsync(u => u.Login == userName);
            }
        }
    }
}