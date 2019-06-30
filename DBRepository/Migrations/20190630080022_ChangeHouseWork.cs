using Microsoft.EntityFrameworkCore.Migrations;

namespace DBRepository.Migrations
{
    public partial class ChangeHouseWork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HouseWorks_Houses_HoustId",
                table: "HouseWorks");

            migrationBuilder.RenameColumn(
                name: "HoustId",
                table: "HouseWorks",
                newName: "HouseId");

            migrationBuilder.RenameIndex(
                name: "IX_HouseWorks_HoustId",
                table: "HouseWorks",
                newName: "IX_HouseWorks_HouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_HouseWorks_Houses_HouseId",
                table: "HouseWorks",
                column: "HouseId",
                principalTable: "Houses",
                principalColumn: "HouseId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HouseWorks_Houses_HouseId",
                table: "HouseWorks");

            migrationBuilder.RenameColumn(
                name: "HouseId",
                table: "HouseWorks",
                newName: "HoustId");

            migrationBuilder.RenameIndex(
                name: "IX_HouseWorks_HouseId",
                table: "HouseWorks",
                newName: "IX_HouseWorks_HoustId");

            migrationBuilder.AddForeignKey(
                name: "FK_HouseWorks_Houses_HoustId",
                table: "HouseWorks",
                column: "HoustId",
                principalTable: "Houses",
                principalColumn: "HouseId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
