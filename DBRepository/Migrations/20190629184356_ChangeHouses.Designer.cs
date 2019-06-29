﻿// <auto-generated />
using System;
using DBRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DBRepository.Migrations
{
    [DbContext(typeof(DomovoyContext))]
    [Migration("20190629184356_ChangeHouses")]
    partial class ChangeHouses
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.House", b =>
                {
                    b.Property<int>("HouseId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<double?>("AreaLivNotLivMKD");

                    b.Property<double?>("AreaLiving");

                    b.Property<double?>("AreaLivingOwned");

                    b.Property<double?>("AreaMKD");

                    b.Property<int?>("BuildYear");

                    b.Property<int>("CountAccident");

                    b.Property<string>("District");

                    b.Property<Guid>("HouseGuid");

                    b.Property<double>("MaintenanceCost");

                    b.Property<int>("MaxFloor");

                    b.Property<int?>("NumberApartments");

                    b.Property<int?>("NumberEntrances");

                    b.Property<int?>("PhysicalWear");

                    b.Property<double>("Rank");

                    b.Property<string>("RoofMaterial");

                    b.Property<string>("RoofType");

                    b.Property<int?>("UkId");

                    b.Property<string>("WallMaterial");

                    b.HasKey("HouseId");

                    b.HasIndex("UkId");

                    b.ToTable("Houses");
                });

            modelBuilder.Entity("Models.Organization", b =>
                {
                    b.Property<int>("OrganizationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("Name");

                    b.Property<int?>("OrganizationTypeId");

                    b.HasKey("OrganizationId");

                    b.HasIndex("OrganizationTypeId");

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("Models.OrganizationType", b =>
                {
                    b.Property<int>("OrganizationTypeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("OrganizationTypeId");

                    b.ToTable("OrganizationTypes");
                });

            modelBuilder.Entity("Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Phone");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Models.House", b =>
                {
                    b.HasOne("Models.Organization", "UK")
                        .WithMany()
                        .HasForeignKey("UkId");
                });

            modelBuilder.Entity("Models.Organization", b =>
                {
                    b.HasOne("Models.OrganizationType", "OrganizationType")
                        .WithMany()
                        .HasForeignKey("OrganizationTypeId");
                });
#pragma warning restore 612, 618
        }
    }
}
