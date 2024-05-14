using Dumpling.Data;
using Dumpling.Functions;
using Dumpling.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

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
        public string LessonId { get; set; }
        public string Name { get; set; }
        public string Translation { get; set; }
        public List<Word> Words { get; set; }
        public int Practised { get; set; }
        public int BestScore { get; set; }
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
                LessonId = lesson.LessonId,
                Name = lesson.Name,
                Translation = lesson.Translation,
                Words = words,
                Practised = userLessons.ElementAt(lessons.IndexOf(lesson)).Practised,
                BestScore = userLessons.ElementAt(lessons.IndexOf(lesson)).BestScore
            });
        }
        
        return Json(lessonModels);
    }
    
    private class LessonContentModel
    {
        public Word Word { get; set; }
        public List<string> Options { get; set; }
    }

    [EnableCors("AllowSpecificOrigin")]
    [HttpGet(Api.LessonScheme.LESSON)]
    public IActionResult Lesson(string lessonId)
    {
        var lessonContent = new List<LessonContentModel>();
        
        var words = _database.Words.Where(x => x.LessonId == lessonId).ToList();
        
        words.ForEach(x =>
        {
            var options = new List<string>();

            for (var i = 0; i < 4; i++)
            {
                var random = new Random().Next(0, words.Count);
                while (options.Contains(words.ElementAt(random).Meaning) || random == words.IndexOf(x))
                {
                    random = new Random().Next(0, words.Count);
                };
                
                options.Add(words.ElementAt(random).Meaning);
            }

            int answerIndex = new Random().Next(0, 4);
            options[answerIndex] = x.Meaning;
            
            lessonContent.Add(new LessonContentModel()
            {
               Word = x,
               Options = options
            });
        });
        
        return Json(lessonContent);
    }

    private class PractiseContentModel
    {
        public string Type  { get; set; }
        public object Options { get; set; }
    }
    
    [EnableCors("AllowSpecificOrigin")]
    [HttpGet(Api.LessonScheme.PRACTISE)]
    public IActionResult Practise(string lessonId)
    {
        var words = _database.Words.Where(x => x.LessonId == lessonId).ToList();
        var exercises = new List<PractiseContentModel>();
        var generatePractise = new GeneratePractise();
        
        for (var i = 0; i < 10; i++)
        {
            // int exerciseRandom = new Random().Next(0, Enum.GetNames(typeof(PractiseType)).Length);;
            // PractiseType exerciseType = (PractiseType)exerciseRandom;
    
            // if (exerciseType == PractiseType.MATCHING)
            // {
            var options = generatePractise.MatchingExercise(words);
            exercises.Add(new PractiseContentModel()
            {
                // Type = Enum.GetName(typeof(PractiseType), exerciseType),
                Type = "MATCHING",
                Options = options
            });
            // }
        }
        
        return Json(exercises);
    }
}

















