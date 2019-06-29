using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository
{
    public class DomovoyContext : IdentityDbContext<User, IdentityRole<long>, long>
    {
        public DomovoyContext(DbContextOptions<DomovoyContext> options) : base(options)
        {
        }

    }
}
