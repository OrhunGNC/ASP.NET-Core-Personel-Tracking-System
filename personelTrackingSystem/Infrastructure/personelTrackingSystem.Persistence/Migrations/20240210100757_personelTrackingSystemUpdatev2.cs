using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace personelTrackingSystem.Persistence.Migrations
{
    public partial class personelTrackingSystemUpdatev2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Personels",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Personels");
        }
    }
}
