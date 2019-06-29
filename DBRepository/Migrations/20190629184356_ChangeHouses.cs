using Microsoft.EntityFrameworkCore.Migrations;

namespace DBRepository.Migrations
{
    public partial class ChangeHouses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Houses_Organizations_OrganizationId",
                table: "Houses");

            migrationBuilder.DropIndex(
                name: "IX_Houses_OrganizationId",
                table: "Houses");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "Houses");

            migrationBuilder.CreateIndex(
                name: "IX_Houses_UkId",
                table: "Houses",
                column: "UkId");

            migrationBuilder.AddForeignKey(
                name: "FK_Houses_Organizations_UkId",
                table: "Houses",
                column: "UkId",
                principalTable: "Organizations",
                principalColumn: "OrganizationId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Houses_Organizations_UkId",
                table: "Houses");

            migrationBuilder.DropIndex(
                name: "IX_Houses_UkId",
                table: "Houses");

            migrationBuilder.AddColumn<int>(
                name: "OrganizationId",
                table: "Houses",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Houses_OrganizationId",
                table: "Houses",
                column: "OrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Houses_Organizations_OrganizationId",
                table: "Houses",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "OrganizationId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
