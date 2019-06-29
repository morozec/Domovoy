using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Domovoy.Data.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsers();
    }
}