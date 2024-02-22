using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace personelTrackingSystem.Persistence.Migrations
{
    public partial class personelTrackingSystemUpdatev4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Personels_TeamEntity_TeamId",
                table: "Personels");

            migrationBuilder.DropTable(
                name: "TeamEntity");

            migrationBuilder.DropIndex(
                name: "IX_Personels_TeamId",
                table: "Personels");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Personels");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "Personels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TeamEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PriorityLevel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TeamBudget = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TeamName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TeamStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamEntity", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Personels_TeamId",
                table: "Personels",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Personels_TeamEntity_TeamId",
                table: "Personels",
                column: "TeamId",
                principalTable: "TeamEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
