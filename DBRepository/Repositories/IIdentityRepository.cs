using System.Threading.Tasks;
using Models;

namespace DBRepository.Repositories
{
    public interface IIdentityRepository
    {
        Task<User> CreateUser(string userName, string password);
        Task<User> GetUser(string userName);
    }
}