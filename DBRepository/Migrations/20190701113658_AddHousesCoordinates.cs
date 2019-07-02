using Microsoft.EntityFrameworkCore.Migrations;

namespace DBRepository.Migrations
{
    public partial class AddHousesCoordinates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "LowerCornerX",
                table: "Houses",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "LowerCornerY",
                table: "Houses",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PosX",
                table: "Houses",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PosY",
                table: "Houses",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "UpperCornerX",
                table: "Houses",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "UpperCornerY",
                table: "Houses",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LowerCornerX",
                table: "Houses");

            migrationBuilder.DropColumn(
                name: "LowerCornerY",
                table: "Houses");

            migrationBuilder.DropColumn(
                name: "PosX",
                table: "Houses");

            migrationBuilder.DropColumn(
                name: "PosY",
                table: "Houses");

            migrationBuilder.DropColumn(
                name: "UpperCornerX",
                table: "Houses");

            migrationBuilder.DropColumn(
                name: "UpperCornerY",
                table: "Houses");
        }
    }
}
