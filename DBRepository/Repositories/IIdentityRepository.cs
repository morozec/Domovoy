using System.Threading.Tasks;
using Models;

namespace DBRepository.Repositories
{
    public interface IIdentityRepository
    {
        Task<User> GetUser(string userName);
    }
}