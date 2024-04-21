using System.ComponentModel.DataAnnotations.Schema;

namespace Dumpling.Data;

public class Word
{
    public string WordId { get; set; } = Guid.NewGuid().ToString();
    public string Value { get; set; }
    public string Meaning { get; set; }
    public string Pronunciation { get; set; }
    
    public string LessonId { get; set; }
    public virtual Lesson Lesson { get; set; }
}