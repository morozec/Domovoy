using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository
{
    public class DomovoyContext : DbContext
    {
        public DomovoyContext(DbContextOptions<DomovoyContext> options) : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
    }
}
