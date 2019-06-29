using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace DBRepository.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsers();
    }
}