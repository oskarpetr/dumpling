using Dumpling.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dumpling.Controllers;

[ApiController]
public class XpController : Controller
{
    private readonly ApplicationDbContext _database;

    public XpController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [EnableCors("AllowSpecificOrigin")]
    [HttpGet(Api.XpScheme.XPS)]
    public IActionResult Xps()
    {
        var xps = _database.Xps.ToList();
        return Json(xps);
    }
    
    public class XpModel
    {
        public int Value { get; set; }
        public int Rank { get; set; }
    }
    
    [EnableCors("AllowSpecificOrigin")]
    [HttpGet(Api.XpScheme.ME)]
    public IActionResult Me()
    {
        // var authorizationToken = HttpContext.Request.Headers["Authorization"].ToString();
        var authorizationToken = "2bf03201-9c3c-404e-b479-712176dbd22a";

        var xp = _database.Xps.FirstOrDefault(x => x.UserId == authorizationToken);
        var rank = _database.Xps.OrderByDescending(x => x.Value).ToList().IndexOf(xp) + 1;

        var model = new XpModel()
        {
            Value = xp.Value,
            Rank = rank
        };
        
        return Json(model);
    }
    
    [EnableCors("AllowSpecificOrigin")]
    [HttpGet(Api.XpScheme.LIST)]
    public IActionResult List()
    {
        var xps = _database.Xps.Include(x => x.User).OrderByDescending(x => x.Value).Take(5).ToList();
        return Json(xps);
    }
}