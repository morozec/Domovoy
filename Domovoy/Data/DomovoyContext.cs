using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Domovoy.Models.DomainObjects;

namespace Domovoy.Data
{
    public class DomovoyContext : IdentityDbContext<User, IdentityRole<long>, long>
    {
        public DomovoyContext(DbContextOptions<DomovoyContext> options) : base(options)
        {
        }

    }
}
