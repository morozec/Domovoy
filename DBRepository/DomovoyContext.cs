﻿using Microsoft.AspNetCore.Identity;
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
        public virtual DbSet<OrganizationType> OrganizationTypes { get; set; }
        public virtual DbSet<Organization> Organizations { get; set; }
        public virtual DbSet<House> Houses { get; set; }
    }
}
