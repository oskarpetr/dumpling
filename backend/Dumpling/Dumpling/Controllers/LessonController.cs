using Dumpling.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dumpling.Controllers;

[ApiController]
public class LessonController : Controller
{
    private readonly ApplicationDbContext _database;

    public LessonController(ApplicationDbContext database)
    {
        _database = database;
    }

    private class LessonModel
    {
        public string lessonId { get; set; }
        public string name { get; set; }
        public string translation { get; set; }
        public List<Word> words { get; set; }
        public bool completed { get; set; }
    }
    
    [EnableCors("AllowSpecificOrigin")]
    [HttpGet(Api.LessonScheme.LESSONS)]
    public IActionResult Lessons()
    {
        // var authorizationToken = HttpContext.Request.Headers["Authorization"].ToString();
        var authorizationToken = "b332aee7-c1b5-4454-b489-21f342ff611d";
        
        var userLessons = _database.UserLessons.Where(x => x.UserId == authorizationToken).ToList();
        List<Lesson> lessons = new();
        
        foreach (var userLesson in userLessons)
        {
            var lesson = _database.Lessons.FirstOrDefault(x => x.LessonId == userLesson.LessonId);
            lessons.Add(lesson);
        }
        
        List<LessonModel> lessonModels = new();

        foreach (var lesson in lessons)
        {
            var words = _database.Words.Where(x => x.LessonId == lesson.LessonId).ToList();
            
            lessonModels.Add(new LessonModel()
            {
                lessonId = lesson.LessonId,
                name = lesson.Name,
                translation = lesson.Translation,
                completed = userLessons.ElementAt(lessons.IndexOf(lesson)).Completed,
                words = words
            });
        }
        
        return Json(lessonModels);
    }
}