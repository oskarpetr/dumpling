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
    
    private class XpModel
    {
        public int value { get; set; }
        public int rank { get; set; }
    }
    
    [EnableCors("AllowSpecificOrigin")]
    [HttpGet(Api.XpScheme.ME)]
    public IActionResult Me()
    {
        // var authorizationToken = HttpContext.Request.Headers["Authorization"].ToString();
        var authorizationToken = "b332aee7-c1b5-4454-b489-21f342ff611d";

        var xp = _database.Xps.FirstOrDefault(x => x.UserId == authorizationToken);
        var rank = _database.Xps.OrderByDescending(x => x.Value).ToList().IndexOf(xp) + 1;

        return Json(new XpModel()
        {
            value = xp.Value,
            rank = rank
        });
    }
    
    [EnableCors("AllowSpecificOrigin")]
    [HttpGet(Api.XpScheme.LIST)]
    public IActionResult List()
    {
        var xps = _database.Xps.Include(x => x.User).OrderByDescending(x => x.Value).Take(5).ToList();
        return Json(xps);
    }
}