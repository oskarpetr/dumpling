using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Dumpling.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Word> Words { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
    public DbSet<UserLesson> UserLessons { get; set; }
    public DbSet<Xp> Xps { get; set; }
    public DbSet<SavedWord> SavedWords { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}