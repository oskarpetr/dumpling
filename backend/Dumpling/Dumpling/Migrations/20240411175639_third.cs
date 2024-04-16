using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dumpling.Migrations
{
    /// <inheritdoc />
    public partial class third : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    LessonId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Translation = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.LessonId);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LessonWords");

            migrationBuilder.DropTable(
                name: "Lessons");
        }
    }
}
