using System.Threading.Tasks;
using Models;

namespace Domovoy.Services
{
    public interface IIdentityService
    {
        Task<User> CreateUser(string userName, string password);
        Task<User> GetUser(string userName);
    }
}