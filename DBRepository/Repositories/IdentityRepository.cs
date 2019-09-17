using System.Threading.Tasks;
using DBRepository.Factories;
using Microsoft.EntityFrameworkCore;
using Models;

using Microsoft.AspNetCore.Identity;

namespace DBRepository.Repositories
{
    public class IdentityRepository : BaseRepository, IIdentityRepository
    {
        public IdentityRepository(string connectionString, IDomovoyContextFactory domovoyContextFactory) : base(connectionString, domovoyContextFactory)
        {
        }

        public async Task<User> CreateUser(string userName, string password)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return null;
                //var user = new User {Email = userName, Password = password};
                //await context.Users.AddAsync(user);
                //await context.SaveChangesAsync();
                //return user;
            }
        }

        public async Task<User> GetUser(string userName)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return null;
                //return await context.Users.SingleOrDefaultAsync(u => u.Email == userName);
            }
        }
    }
}