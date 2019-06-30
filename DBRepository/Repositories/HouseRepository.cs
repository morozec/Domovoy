using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBRepository.Factories;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository.Repositories
{
    public class HouseRepository : BaseRepository, IHouseRepository
    {
        public HouseRepository(string connectionString, IDomovoyContextFactory domovoyContextFactory) : base(
            connectionString, domovoyContextFactory)
        {
        }

        public async Task<List<House>> GetHouses()
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Houses.ToListAsync();
            }
        }

        public async Task<List<House>> GetHousesByAddress(string address)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Houses.Where(h => h.Address.Contains(address)).ToListAsync();
            }
        }

        public async Task<House> GetHousesById(int id)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Houses
                    .Include(e => e.UK)
                    .SingleOrDefaultAsync(h => h.HouseId == id);
            }
        }

        public async Task<List<HouseViolation>> GetHouseViolations(int id)
        {
            using (var context = DomovoyContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.HouseViolations
                    .Where(e => e.HouseId == id).ToListAsync();
            }
        }
    }
}
