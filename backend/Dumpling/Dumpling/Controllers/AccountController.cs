using Dumpling.Data;
using Dumpling.Functions;
using Dumpling.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Dumpling.Controllers;

[ApiController]
public class AccountController : Controller
{
    private readonly ApplicationDbContext _database;

    public AccountController(ApplicationDbContext database)
    {
        _database = database;
    }

    public class AccountModel
    {
        public string username { get; set; }
        public string password { get; set; }
    }
    
    [EnableCors("AllowSpecificOrigin")]
    [HttpPost(Api.AccountScheme.ACCOUNTS)]
    public IActionResult Accounts([FromBody] AccountModel model)
    {
        try
        {
            if(_database.Users.FirstOrDefault(x => x.Username == model.username) != null)
            {
                return new StatusCodeResult(409);
            }
            
            _database.Users.Add(new User()
            {
                Username = model.username,
                Password = model.password
            });

            _database.SaveChanges();
            
            return Ok();
        }
        catch (Exception e)
        {
            return new StatusCodeResult(500);
        }
    }

    public class SignInModel
    {
        public string username { get; set; }
    }

    [EnableCors("AllowSpecificOrigin")]
    [HttpPost(Api.AccountScheme.SIGNIN)]
    public IActionResult SignIn([FromBody] SignInModel model)
    {
        var user = _database.Users.FirstOrDefault(x => x.Username == model.username);
        
        if (user == null)
        {
            return new StatusCodeResult(404);
        }

        return Json(user);
    }
}

















