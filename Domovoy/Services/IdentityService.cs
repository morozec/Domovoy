using System.Threading.Tasks;
using DBRepository.Repositories;
using Models;

namespace Domovoy.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly IIdentityRepository _identityRepository;

        public IdentityService(IIdentityRepository identityRepository)
        {
            _identityRepository = identityRepository;
        }

        public async Task<User> CreateUser(string userName, string password)
        {
            return await _identityRepository.CreateUser(userName, password);
        }

        public async Task<User> GetUser(string userName)
        {
            return await _identityRepository.GetUser(userName);
        }
    }
}