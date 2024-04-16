namespace Dumpling.Data;

public class UserLesson
{
    public string UserLessonId { get; set; } = Guid.NewGuid().ToString();
    
    public string LessonId { get; set; }
    public virtual Lesson Lesson { get; set; }
    
    public string UserId { get; set; }
    public virtual User User { get; set; }

    public bool Completed { get; set; } = false;
}