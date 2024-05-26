namespace Dumpling.Data;

public class Unit
{
    public string UnitId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
}