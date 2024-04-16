namespace Dumpling.Data;

public class UserWord
{
    public string UserWordId { get; set; } = Guid.NewGuid().ToString();
    
    public string UserId { get; set; }
    public virtual User User { get; set; }
    
    public string WordId { get; set; }
    public virtual Word Word { get; set; }
}