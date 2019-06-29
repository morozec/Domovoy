using System.Collections.Generic;
using System.Threading.Tasks;
using Domovoy.Data.Factories;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Domovoy.Data.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(string connectionString, IDomovoyContextFactory domovoyContextFactory) : base(
            connectionString, domovoyContextFactory)
        {
        }

        public async Task<List<User>> GetUsers()
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Users.ToListAsync();
            }
        }

        
    }
}