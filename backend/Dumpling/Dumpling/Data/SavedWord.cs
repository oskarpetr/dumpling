namespace Dumpling.Data;

public class SavedWord
{
    public string SavedWordId { get; set; } = Guid.NewGuid().ToString();

    public string UserId { get; set; }
    public virtual User User { get; set; }
        
    public string WordId { get; set; }
    public virtual Word Word { get; set; }
}