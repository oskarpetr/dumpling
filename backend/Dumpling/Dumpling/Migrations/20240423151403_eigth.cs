using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dumpling.Migrations
{
    /// <inheritdoc />
    public partial class eigth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completed",
                table: "UserLessons");

            migrationBuilder.AddColumn<int>(
                name: "BestScore",
                table: "UserLessons",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Practised",
                table: "UserLessons",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BestScore",
                table: "UserLessons");

            migrationBuilder.DropColumn(
                name: "Practised",
                table: "UserLessons");

            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "UserLessons",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
