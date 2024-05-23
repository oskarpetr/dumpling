using Dumpling.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    
    [HttpGet(Api.WordScheme.SAVEDWORDS)]
    public IActionResult SavedWords()
    {
        var authorizationToken = HttpContext.Request.Headers["Authorization"].ToString();
        
        var words = _database.SavedWords.Where(x => x.UserId == authorizationToken).Select(x => x.Word).ToList();
        return Json(words);
    }
    
    public class WordModel
    {
        public string id { get; set; }
    }
    
    [HttpPost(Api.WordScheme.SAVEWORD)]
    public IActionResult SaveWord([FromBody] WordModel model)
    {
        var authorizationToken = HttpContext.Request.Headers["Authorization"].ToString();
        
        var word = _database.SavedWords.FirstOrDefault(x => x.WordId == model.id);
        if (word == null)
        {
            _database.SavedWords.Add(new SavedWord()
            {
                UserId = authorizationToken,
                WordId = model.id,
            });
        }
        else
        {
            _database.SavedWords.Remove(word);
        }
        
        _database.SaveChanges();
        
        return Ok();
    }

    [HttpPost(Api.WordScheme.ISWORDSAVED)]
    public IActionResult IsWordSaved([FromBody] WordModel model)
    {
        var authorizationToken = HttpContext.Request.Headers["Authorization"].ToString();
        
        var isSaved = _database.SavedWords.ToList().Exists(x => x.UserId == authorizationToken && x.WordId == model.id);
        return Json(isSaved);
    }
}