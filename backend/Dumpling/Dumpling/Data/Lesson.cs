namespace Dumpling.Data;

public class Lesson
{
    public string LessonId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string Translation { get; set; }
    public string UnitId { get; set; }
    public virtual Unit Unit { get; set; }
}