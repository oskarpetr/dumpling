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

    private class UnitModel
    {
        public string Name { get; set; }
        public List<LessonModel> Lessons { get; set; }
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
        var authorizationToken = HttpContext.Request.Headers["Authorization"].ToString();
        
        var units = _database.Units.ToList();
        var unitsModels = new List<UnitModel>();

        foreach (var unit in units)
        {
            var unitLessons = _database.Lessons.Where(x => x.UnitId == unit.UnitId).ToList();
            var completedLessons = _database.UserLessons.Where(x => x.UserId == authorizationToken && x.Lesson.UnitId == unit.UnitId).ToList();
            var lessonModels = new List<LessonModel>();
            
            foreach (var unitLesson in unitLessons)
            {
                var lesson = completedLessons.FirstOrDefault(x => x.LessonId == unitLesson.LessonId);

                if (lesson != null)
                {
                    lessonModels.Add(new LessonModel()
                    {
                        LessonId = unitLesson.LessonId,
                        Name = unitLesson.Name,
                        Translation = unitLesson.Translation,
                        Words = _database.Words.Where(x => x.LessonId == unitLesson.LessonId).ToList(),
                        Practised = lesson.Practised,
                        BestScore = lesson.BestScore
                    });
                }
                else
                {
                    lessonModels.Add(new LessonModel()
                    {
                        LessonId = unitLesson.LessonId,
                        Name = unitLesson.Name,
                        Translation = unitLesson.Translation,
                        Words = _database.Words.Where(x => x.LessonId == unitLesson.LessonId).ToList(),
                        Practised = 0,
                        BestScore = 0
                    });
                }
            }

            unitsModels.Add(new UnitModel()
            {
                Name = unit.Name,
                Lessons = lessonModels
            });
        }
        
        return Json(unitsModels);
    }
    
    private class LessonContentModel
    {
        public Word Answer { get; set; }
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
               Answer = x,
               Options = options
            });
        });
        
        return Json(lessonContent);
    }

    private class PractiseContentModel
    {
        public string Type { get; set; }
        public object Task { get; set; }
    }
    
    [EnableCors("AllowSpecificOrigin")]
    [HttpGet(Api.LessonScheme.PRACTISE)]
    public IActionResult Practise(string lessonId)
    {
        var words = _database.Words.Where(x => x.LessonId == lessonId).ToList();
        var exercises = new List<PractiseContentModel>();
        var generatePractise = new GeneratePractise();
        
        PractiseType lastExercise = PractiseType.MATCHING;
        for (var i = 0; i < 10; i++)
        {
            int exerciseRandom = new Random().Next(0, Enum.GetNames(typeof(PractiseType)).Length);;
            PractiseType exerciseType = (PractiseType)exerciseRandom;

            while (exerciseType == lastExercise)
            {
                exerciseRandom = new Random().Next(0, Enum.GetNames(typeof(PractiseType)).Length);;
                exerciseType = (PractiseType)exerciseRandom;
            }
            
            lastExercise = exerciseType;

            var content = new PractiseContentModel()
            {
                Type = Enum.GetName(typeof(PractiseType), exerciseType),
                Task = new()
            };
            
            if (exerciseType == PractiseType.MATCHING)
            {
                var options = generatePractise.MatchingExercise(words);
                content.Task = options;
                
            }
            else if (exerciseType == PractiseType.MULTIPLE_CHOICE)
            {
                var options = generatePractise.MultipleChoiceExercise(words);
                content.Task = options;
            }
            else if (exerciseType == PractiseType.PRONUNCIATION)
            {
                var options = generatePractise.PronunciationExercise(words);
                content.Task = options;
            }
            else if(exerciseType == PractiseType.WRITING)
            {
                var options = generatePractise.WritingExercise(words);
                content.Task = options;
            }
            
            exercises.Add(content);
        }
        
        return Json(exercises);
    }

    public class CompleteModel
    {
        public int xp { get; set; }
    }

    [EnableCors("AllowSpecificOrigin")]
    [HttpPost(Api.LessonScheme.COMPLETE)]
    public IActionResult Lesson(string lessonId, [FromBody] CompleteModel model)
    {
        var authorizationToken = HttpContext.Request.Headers["Authorization"].ToString();
        
        var lessonAlreadyDone = _database.UserLessons.ToList().Exists(x => x.UserId == authorizationToken && x.LessonId == lessonId);
        if(lessonAlreadyDone)
        {
            var userLesson = _database.UserLessons.FirstOrDefault(x => x.UserId == authorizationToken && x.LessonId == lessonId);
            
            userLesson.Practised++;
            userLesson.BestScore = Math.Max(userLesson.BestScore, (int)Math.Floor(((float)model.xp / 200) * 5));

            _database.SaveChanges();
        }
        else
        {
            _database.UserLessons.Add(new UserLesson()
            {
                UserId = authorizationToken,
                LessonId = lessonId,
                Practised = 1,
                BestScore = (int)Math.Floor(((float)model.xp / 200) * 5)
            });
        }

        var xp = _database.Xps.FirstOrDefault(x => x.UserId == authorizationToken);
        xp.Value += model.xp;

        _database.SaveChanges();
        return Ok();
    }
}

















