using System.Threading.Tasks;
using Models;

namespace Domovoy.Services
{
    public interface IIdentityService
    {
        Task<User> GetUser(string userName);
    }
}