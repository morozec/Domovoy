using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore.SqlServer;
using AutoMapper;
using DBRepository;
using DBRepository.Factories;
using DBRepository.Repositories;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Models;

namespace Domovoy
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFrameworkSqlServer().AddDbContext<DomovoyContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("domovoyConnection"),
                b =>
                {
                    b.MigrationsAssembly("DBRepository");
                    //b.UseNetTopologySuite();
                });
            });

            //Identity
            //services.AddIdentity<User, IdentityRole<long>>(o =>
            //{
            //    o.Password.RequireDigit = false;
            //    o.Password.RequireLowercase = false;
            //    o.Password.RequireUppercase = false;
            //    o.Password.RequireNonAlphanumeric = false;
            //    o.Password.RequiredLength = 6;
            //})
            //.AddDefaultUI(UIFramework.Bootstrap4)
            //.AddSignInManager<SignInManager<User>>()
            //.AddEntityFrameworkStores<DomovoyContext>()
            //.AddDefaultTokenProviders();

            //Authentication
            //services.AddAuthentication(options =>
            //{
            //    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            //})
            //.AddCookie(options =>
            //{
            //    options.LoginPath = new PathString("/auth/login");
            //    options.LogoutPath = new PathString("/home/index");
            //});

            //Mapper
            services.AddAutoMapper();

            //Validation
            services
                .AddMvc()
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());

            //Policy
            //services.AddAuthorization(options =>
            //{
            //    options.AddPolicy("SuperAdmin", policy => policy.RequireRole("super_admin"));
            //    options.AddPolicy("Administration", policy => policy.RequireRole("admin"));
            //    options.AddPolicy("All", policy => policy.RequireRole(new string[] { "admin", "manager", "super_user", "user" }));
            //    options.AddPolicy("Management", policy => policy.RequireRole(new string[] { "admin", "manager" }));
            //    options.AddPolicy("SuperRight", policy => policy.RequireRole(new string[] { "admin", "super_user" }));
            //});


            services.AddScoped<IDomovoyContextFactory, DomovoyContextFactory>();
            services.AddScoped<IHouseRepository>(provider => new HouseRepository(
                Configuration.GetConnectionString("domovoyConnection"),
                provider.GetService<IDomovoyContextFactory>()));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseExceptionHandler("/Home/Error");
            app.UseStatusCodePagesWithReExecute("/Error/{0}");

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

        }
    }
}
