using Dumpling.Data;
using Microsoft.AspNetCore.Mvc;

namespace Dumpling.Controllers;

[ApiController]
public class WordController : Controller
{
    private readonly ApplicationDbContext _database;

    public WordController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [HttpGet(Api.WordScheme.WORDS)]
    public IActionResult Words()
    {
        var words = _database.Words.ToList();
        return Json(words);
    }
}