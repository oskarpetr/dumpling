using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dumpling.Migrations
{
    /// <inheritdoc />
    public partial class fifth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LessonWords");

            migrationBuilder.AddColumn<string>(
                name: "LessonId",
                table: "Words",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Words_LessonId",
                table: "Words",
                column: "LessonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Words_Lessons_LessonId",
                table: "Words",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "LessonId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Words_Lessons_LessonId",
                table: "Words");

            migrationBuilder.DropIndex(
                name: "IX_Words_LessonId",
                table: "Words");

            migrationBuilder.DropColumn(
                name: "LessonId",
                table: "Words");

            migrationBuilder.CreateTable(
                name: "LessonWords",
                columns: table => new
                {
                    LessonWordId = table.Column<string>(type: "text", nullable: false),
                    LessonId = table.Column<string>(type: "text", nullable: false),
                    WordId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonWords", x => x.LessonWordId);
                    table.ForeignKey(
                        name: "FK_LessonWords_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "LessonId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonWords_Words_WordId",
                        column: x => x.WordId,
                        principalTable: "Words",
                        principalColumn: "WordId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LessonWords_LessonId",
                table: "LessonWords",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonWords_WordId",
                table: "LessonWords",
                column: "WordId");
        }
    }
}
