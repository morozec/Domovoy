using Microsoft.EntityFrameworkCore.Migrations;

namespace DBRepository.Migrations
{
    public partial class ChangeHouseAndOrg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Organizations_OrganizationTypes_OrganizationTypeId",
                table: "Organizations");

            migrationBuilder.AlterColumn<int>(
                name: "OrganizationTypeId",
                table: "Organizations",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "UkId",
                table: "Houses",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Organizations_OrganizationTypes_OrganizationTypeId",
                table: "Organizations",
                column: "OrganizationTypeId",
                principalTable: "OrganizationTypes",
                principalColumn: "OrganizationTypeId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Organizations_OrganizationTypes_OrganizationTypeId",
                table: "Organizations");

            migrationBuilder.AlterColumn<int>(
                name: "OrganizationTypeId",
                table: "Organizations",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UkId",
                table: "Houses",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Organizations_OrganizationTypes_OrganizationTypeId",
                table: "Organizations",
                column: "OrganizationTypeId",
                principalTable: "OrganizationTypes",
                principalColumn: "OrganizationTypeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
