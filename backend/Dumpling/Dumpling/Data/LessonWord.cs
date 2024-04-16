namespace Dumpling.Data;

public class LessonWord
{
    public string LessonWordId { get; set; } = Guid.NewGuid().ToString();
    
    public string LessonId { get; set; }
    public virtual Lesson Lesson { get; set; }
    
    public string WordId { get; set; }
    public virtual Word Word { get; set; }
}