﻿// <auto-generated />
using System;
using DBRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DBRepository.Migrations
{
    [DbContext(typeof(DomovoyContext))]
    partial class DomovoyContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.Auction", b =>
                {
                    b.Property<int>("AuctionId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateEnd");

                    b.Property<DateTime>("DateStart");

                    b.Property<int>("HouseId");

                    b.Property<string>("Status");

                    b.HasKey("AuctionId");

                    b.ToTable("Auctions");
                });

            modelBuilder.Entity("Models.AuctionBid", b =>
                {
                    b.Property<int>("AuctionBidId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AuctionId");

                    b.Property<double>("Cost");

                    b.Property<DateTime>("DateAdd");

                    b.Property<int>("OrganizationId");

                    b.HasKey("AuctionBidId");

                    b.HasIndex("AuctionId");

                    b.HasIndex("OrganizationId");

                    b.ToTable("AuctionBids");
                });

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

                    b.Property<double>("LowerCornerX");

                    b.Property<double>("LowerCornerY");

                    b.Property<double>("MaintenanceCost");

                    b.Property<int>("MaxFloor");

                    b.Property<int?>("NumberApartments");

                    b.Property<int?>("NumberEntrances");

                    b.Property<double?>("PhysicalWear");

                    b.Property<double>("PosX");

                    b.Property<double>("PosY");

                    b.Property<double>("Rank");

                    b.Property<string>("RoofMaterial");

                    b.Property<string>("RoofType");

                    b.Property<int?>("UkId");

                    b.Property<double>("UpperCornerX");

                    b.Property<double>("UpperCornerY");

                    b.Property<string>("WallMaterial");

                    b.HasKey("HouseId");

                    b.HasIndex("UkId");

                    b.ToTable("Houses");
                });

            modelBuilder.Entity("Models.HouseViolation", b =>
                {
                    b.Property<int>("HouseViolationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("HouseId");

                    b.Property<string>("ViolationDate");

                    b.Property<string>("ViolationDescriptions");

                    b.HasKey("HouseViolationId");

                    b.HasIndex("HouseId");

                    b.ToTable("HouseViolations");
                });

            modelBuilder.Entity("Models.HouseWork", b =>
                {
                    b.Property<int>("HouseWorkId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AmountMeasure");

                    b.Property<double?>("FactAmount");

                    b.Property<double?>("FactCost");

                    b.Property<int>("HouseId");

                    b.Property<string>("WorkDate");

                    b.Property<string>("WorkName");

                    b.HasKey("HouseWorkId");

                    b.HasIndex("HouseId");

                    b.ToTable("HouseWorks");
                });

            modelBuilder.Entity("Models.Organization", b =>
                {
                    b.Property<int>("OrganizationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("Name");

                    b.Property<int?>("OrganizationTypeId");

                    b.Property<double>("Rank");

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

                    b.Property<string>("Login");

                    b.Property<string>("Password");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Models.AuctionBid", b =>
                {
                    b.HasOne("Models.Auction", "Auction")
                        .WithMany()
                        .HasForeignKey("AuctionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.Organization", "Organization")
                        .WithMany()
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.House", b =>
                {
                    b.HasOne("Models.Organization", "UK")
                        .WithMany()
                        .HasForeignKey("UkId");
                });

            modelBuilder.Entity("Models.HouseViolation", b =>
                {
                    b.HasOne("Models.House", "House")
                        .WithMany()
                        .HasForeignKey("HouseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.HouseWork", b =>
                {
                    b.HasOne("Models.House", "House")
                        .WithMany()
                        .HasForeignKey("HouseId")
                        .OnDelete(DeleteBehavior.Cascade);
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
