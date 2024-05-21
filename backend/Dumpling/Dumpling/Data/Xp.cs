namespace Dumpling.Data;

public class Xp
{
    public string XpId { get; set; } = Guid.NewGuid().ToString();

    public int Value { get; set; } = 0;
    
    public string UserId { get; set; }
    public virtual User User { get; set; }
}