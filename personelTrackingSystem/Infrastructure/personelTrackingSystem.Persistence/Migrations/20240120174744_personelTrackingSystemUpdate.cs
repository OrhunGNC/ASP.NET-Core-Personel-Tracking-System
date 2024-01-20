using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace personelTrackingSystem.Persistence.Migrations
{
    public partial class personelTrackingSystemUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "Personels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AnnualLeaveEntity",
                columns: table => new
                {
                    LeaveId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PersonelId = table.Column<int>(type: "int", nullable: false),
                    LeaveStartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LeaveEndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ApprovalStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LeaveApplicationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnualLeaveEntity", x => x.LeaveId);
                    table.ForeignKey(
                        name: "FK_AnnualLeaveEntity_Personels_PersonelId",
                        column: x => x.PersonelId,
                        principalTable: "Personels",
                        principalColumn: "PersonelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LateArrivalEntity",
                columns: table => new
                {
                    ArrivalId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PersonelID = table.Column<int>(type: "int", nullable: false),
                    LateArrivalDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LateArrivalTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApprovalStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LateArrivalEntity", x => x.ArrivalId);
                    table.ForeignKey(
                        name: "FK_LateArrivalEntity_Personels_PersonelID",
                        column: x => x.PersonelID,
                        principalTable: "Personels",
                        principalColumn: "PersonelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SalaryEntity",
                columns: table => new
                {
                    SalaryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PersonelId = table.Column<int>(type: "int", nullable: false),
                    PersonelSalary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalaryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IncreaseRate = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalaryEntity", x => x.SalaryId);
                    table.ForeignKey(
                        name: "FK_SalaryEntity_Personels_PersonelId",
                        column: x => x.PersonelId,
                        principalTable: "Personels",
                        principalColumn: "PersonelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TeamEntity",
                columns: table => new
                {
                    TeamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TeamName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TeamStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PriorityLevel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TeamBudget = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamEntity", x => x.TeamId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Personels_TeamId",
                table: "Personels",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_AnnualLeaveEntity_PersonelId",
                table: "AnnualLeaveEntity",
                column: "PersonelId");

            migrationBuilder.CreateIndex(
                name: "IX_LateArrivalEntity_PersonelID",
                table: "LateArrivalEntity",
                column: "PersonelID");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryEntity_PersonelId",
                table: "SalaryEntity",
                column: "PersonelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Personels_TeamEntity_TeamId",
                table: "Personels",
                column: "TeamId",
                principalTable: "TeamEntity",
                principalColumn: "TeamId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Personels_TeamEntity_TeamId",
                table: "Personels");

            migrationBuilder.DropTable(
                name: "AnnualLeaveEntity");

            migrationBuilder.DropTable(
                name: "LateArrivalEntity");

            migrationBuilder.DropTable(
                name: "SalaryEntity");

            migrationBuilder.DropTable(
                name: "TeamEntity");

            migrationBuilder.DropIndex(
                name: "IX_Personels_TeamId",
                table: "Personels");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Personels");
        }
    }
}
