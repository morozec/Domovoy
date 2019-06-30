using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DBRepository.Migrations
{
    public partial class AddHouseWork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HouseWorks",
                columns: table => new
                {
                    HouseWorkId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    HoustId = table.Column<int>(nullable: false),
                    WorkName = table.Column<string>(nullable: true),
                    WorkDate = table.Column<string>(nullable: true),
                    FactCost = table.Column<double>(nullable: true),
                    FactAmount = table.Column<double>(nullable: true),
                    AmountMeasure = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HouseWorks", x => x.HouseWorkId);
                    table.ForeignKey(
                        name: "FK_HouseWorks_Houses_HoustId",
                        column: x => x.HoustId,
                        principalTable: "Houses",
                        principalColumn: "HouseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HouseWorks_HoustId",
                table: "HouseWorks",
                column: "HoustId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HouseWorks");
        }
    }
}
