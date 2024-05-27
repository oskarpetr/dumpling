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
    
    public class Database
    {
        public List<Word> Words { get; set; }

        public Database()
        {
            Words = new List<Word>();
        }

        public void AddWord(string lessonId, string value, string meaning, string pinyin) // Updated to accept Pinyin
        {
            Words.Add(new Word() { LessonId = lessonId, Value = value, Meaning = meaning, Pronunciation = pinyin }); // Updated to include Pinyin
        }
    }

    [HttpGet("/api/upload-words")]
    public IActionResult UploadWords()
    {
        Database database = new Database();
        AddWordsForUnit1(database, _database);
        
        AddWordsForUnit2(database, _database);
        
        // Unit 3: Basic Conversations
        AddWordsForUnit3(database, _database);
        
        // Unit 4: Family and Relationships
        AddWordsForUnit4(database, _database);
        
        // Unit 5: Days, Months, and Time
        AddWordsForUnit5(database, _database);
        
        // Unit 6: Food and Drinks
        AddWordsForUnit6(database, _database);
        
        // Unit 7: Colors and Shapes
        AddWordsForUnit7(database, _database);
        
        // Unit 8: Clothing and Fashion
        AddWordsForUnit8(database, _database);
        
        // Unit 9: Weather and Seasons
        AddWordsForUnit9(database, _database);
        
        // Unit 10: Travel and Transportation
        AddWordsForUnit10(database, _database);
        _database.Words.AddRange(database.Words);
        _database.SaveChanges();
        return Json("");
    }
    
     public static void AddWordsForUnit1(Database database, ApplicationDbContext _database)
     {
         string unit1Guid = Guid.NewGuid().ToString();

         _database.Units.Add(new Unit()
         {
             UnitId = unit1Guid,
                Name = "Introduction"
         });
         _database.SaveChanges();
         
        // Lesson 1: Greetings
        string unit1Lesson1Guid = Guid.NewGuid().ToString();
        _database.Lessons.Add(new Lesson()
        {
            LessonId = unit1Lesson1Guid,
            Name = "Greetings",
            Translation = "问候",
            UnitId = unit1Guid
        });
    
    _database.SaveChanges();
    
        database.AddWord(unit1Lesson1Guid, "你好", "Hello", "Nǐ hǎo");
        database.AddWord(unit1Lesson1Guid, "早上好", "Good morning", "Zǎoshang hǎo");
        database.AddWord(unit1Lesson1Guid, "下午好", "Good afternoon", "Xiàwǔ hǎo");
        database.AddWord(unit1Lesson1Guid, "晚上好", "Good evening", "Wǎnshàng hǎo");
        database.AddWord(unit1Lesson1Guid, "你好吗", "How are you?", "Nǐ hǎo ma?");
        database.AddWord(unit1Lesson1Guid, "我很好", "I'm fine", "Wǒ hěn hǎo");
        database.AddWord(unit1Lesson1Guid, "谢谢", "Thank you", "Xièxiè");
        database.AddWord(unit1Lesson1Guid, "再见", "Goodbye", "Zàijiàn");
        database.AddWord(unit1Lesson1Guid, "对不起", "Sorry", "Duìbùqǐ");
        database.AddWord(unit1Lesson1Guid, "没关系", "It's okay", "Méiguānxi");

        // Lesson 2: Introductions
        string unit1Lesson2Guid = Guid.NewGuid().ToString();
        _database.Lessons.Add(new Lesson()
        {
            LessonId = unit1Lesson2Guid,
            Name = "Introductions",
            Translation = "介绍",
            UnitId = unit1Guid
        });
        _database.SaveChanges();
        database.AddWord(unit1Lesson2Guid, "我叫", "My name is", "Wǒ jiào");
        database.AddWord(unit1Lesson2Guid, "你叫什么名字", "What's your name?", "Nǐ jiào shénme míngzì?");
        database.AddWord(unit1Lesson2Guid, "我是", "I am", "Wǒ shì");
        database.AddWord(unit1Lesson2Guid, "多大了", "How old are you?", "Duō dà le?");
        database.AddWord(unit1Lesson2Guid, "我今年", "I am", "Wǒ jīnnián");
        database.AddWord(unit1Lesson2Guid, "我来自", "I am from", "Wǒ láizì");
        database.AddWord(unit1Lesson2Guid, "很高兴认识你", "Nice to meet you", "Hěn gāoxìng rènshì nǐ");
        database.AddWord(unit1Lesson2Guid, "你几岁", "How old are you?", "Nǐ jǐ suì?");
        database.AddWord(unit1Lesson2Guid, "你是哪国人", "Where are you from?", "Nǐ shì nǎ guó rén?");

        // Lesson 3: Polite Expressions
        string unit1Lesson3Guid = Guid.NewGuid().ToString();
        _database.Lessons.Add(new Lesson()
        {
            LessonId = unit1Lesson3Guid,
            Name = "Expressions",
            Translation = "用语",
            UnitId = unit1Guid
        });
        _database.SaveChanges();
        database.AddWord(unit1Lesson3Guid, "请", "Please", "Qǐng");
        database.AddWord(unit1Lesson3Guid, "谢谢", "Thank you", "Xièxiè");
        database.AddWord(unit1Lesson3Guid, "对不起", "I'm sorry", "Duìbùqǐ");
        database.AddWord(unit1Lesson3Guid, "没关系", "It's okay", "Méiguānxi");
        database.AddWord(unit1Lesson3Guid, "不客气", "You're welcome", "Bù kèqì");
        database.AddWord(unit1Lesson3Guid, "请问", "Excuse me", "Qǐngwèn");
        database.AddWord(unit1Lesson3Guid, "好的", "Okay", "Hǎo de");
        database.AddWord(unit1Lesson3Guid, "再见", "Goodbye", "Zàijiàn");
        database.AddWord(unit1Lesson3Guid, "祝你好运", "Good luck", "Zhù nǐ hǎoyùn");
        database.AddWord(unit1Lesson3Guid, "请多关照", "Please take care of me", "Qǐng duō guānzhào");
    }
    
     public static void AddWordsForUnit2(Database database, ApplicationDbContext _database)
    {
        string unit2Guid = Guid.NewGuid().ToString();
        _database.Units.Add(new Unit()
        {
            UnitId = unit2Guid,
            Name = "Numbers and Counting"
        });
        _database.SaveChanges();
        
        // Lesson 1: Numbers
        string unit2Lesson1Guid = Guid.NewGuid().ToString();
        _database.Lessons.Add(new Lesson()
        {
            LessonId = unit2Lesson1Guid,
            Name = "Numbers",
            Translation = "数字",
            UnitId = unit2Guid
        });
        _database.SaveChanges();
        database.AddWord(unit2Lesson1Guid, "一", "One", "Yī");
        database.AddWord(unit2Lesson1Guid, "二", "Two", "Èr");
        database.AddWord(unit2Lesson1Guid, "三", "Three", "Sān");
        database.AddWord(unit2Lesson1Guid, "四", "Four", "Sì");
        database.AddWord(unit2Lesson1Guid, "五", "Five", "Wǔ");
        database.AddWord(unit2Lesson1Guid, "六", "Six", "Liù");
        database.AddWord(unit2Lesson1Guid, "七", "Seven", "Qī");
        database.AddWord(unit2Lesson1Guid, "八", "Eight", "Bā");
        database.AddWord(unit2Lesson1Guid, "九", "Nine", "Jiǔ");
        database.AddWord(unit2Lesson1Guid, "十", "Ten", "Shí");

        // Lesson 2: Days of the Week
        string unit2Lesson2Guid = Guid.NewGuid().ToString();
        _database.Lessons.Add(new Lesson()
        {
            LessonId = unit2Lesson2Guid,
            Name = "Week days",
            Translation = "星期",
            UnitId = unit2Guid
        });
        _database.SaveChanges();
        database.AddWord(unit2Lesson2Guid, "星期一", "Monday", "Xīngqī yī");
        database.AddWord(unit2Lesson2Guid, "星期二", "Tuesday", "Xīngqī èr");
        database.AddWord(unit2Lesson2Guid, "星期三", "Wednesday", "Xīngqī sān");
        database.AddWord(unit2Lesson2Guid, "星期四", "Thursday", "Xīngqī sì");
        database.AddWord(unit2Lesson2Guid, "星期五", "Friday", "Xīngqī wǔ");
        database.AddWord(unit2Lesson2Guid, "星期六", "Saturday", "Xīngqī liù");
        database.AddWord(unit2Lesson2Guid, "星期天", "Sunday", "Xīngqī tiān");

        // Lesson 3: Months of the Year
        string unit2Lesson3Guid = Guid.NewGuid().ToString();
        _database.Lessons.Add(new Lesson()
        {
            LessonId = unit2Lesson3Guid,
            Name = "Months",
            Translation = "月份",
            UnitId = unit2Guid
        });
        _database.SaveChanges();
        database.AddWord(unit2Lesson3Guid, "一月", "January", "Yī yuē");
        database.AddWord(unit2Lesson3Guid, "二月", "February", "Èr yuē");
        database.AddWord(unit2Lesson3Guid, "三月", "March", "Sān yuē");
        database.AddWord(unit2Lesson3Guid, "四月", "April", "Sì yuē");
        database.AddWord(unit2Lesson3Guid, "五月", "May", "Wǔ yuē");
        database.AddWord(unit2Lesson3Guid, "六月", "June", "Liù yuē");
        database.AddWord(unit2Lesson3Guid, "七月", "July", "Qī yuē");
        database.AddWord(unit2Lesson3Guid, "八月", "August", "Bā yuē");
        database.AddWord(unit2Lesson3Guid, "九月", "September", "Jiǔ yuē");
        database.AddWord(unit2Lesson3Guid, "十月", "October", "Shí yuē");

        // Lesson 4: Personal Pronouns
        string unit2Lesson4Guid = Guid.NewGuid().ToString();
        _database.Lessons.Add(new Lesson()
        {
            LessonId = unit2Lesson4Guid,
            Name = "Pronouns",
            Translation = "代词",
            UnitId = unit2Guid
        });
        _database.SaveChanges();
        database.AddWord(unit2Lesson4Guid, "我", "I", "Wǒ");
        database.AddWord(unit2Lesson4Guid, "你", "You", "Nǐ");
        database.AddWord(unit2Lesson4Guid, "他", "He", "Tā");
        database.AddWord(unit2Lesson4Guid, "她", "She", "Tā");
        database.AddWord(unit2Lesson4Guid, "它", "It", "Tā");
        database.AddWord(unit2Lesson4Guid, "我们", "We", "Wǒmen");
        database.AddWord(unit2Lesson4Guid, "你们", "You (plural)", "Nǐmen");
        database.AddWord(unit2Lesson4Guid, "他们", "They (male)", "Tāmen");
        database.AddWord(unit2Lesson4Guid, "她们", "They (female)", "Tāmen");
        database.AddWord(unit2Lesson4Guid, "它们", "They (non-human)", "Tāmen");
    }

    public static void AddWordsForUnit3(Database database, ApplicationDbContext _database)
    {
            string unit3Guid = Guid.NewGuid().ToString();
            
            _database.Units.Add(new Unit()
            {
                UnitId = unit3Guid,
                Name = "Basic Conversations"
            });
            _database.SaveChanges();
            
        // Lesson 1: Family
        string unit3Lesson1Guid = Guid.NewGuid().ToString();
        _database.Lessons.Add(new Lesson()
        {
            LessonId = unit3Lesson1Guid,
            Name = "Family",
            Translation = "家庭",
            UnitId = unit3Guid
        });
        _database.SaveChanges();
        database.AddWord(unit3Lesson1Guid, "爸爸", "Dad", "Bàba");
        database.AddWord(unit3Lesson1Guid, "妈妈", "Mom", "Māmā");
        database.AddWord(unit3Lesson1Guid, "哥哥", "Elder brother", "Gēge");
        database.AddWord(unit3Lesson1Guid, "姐姐", "Elder sister", "Jiějie");
        database.AddWord(unit3Lesson1Guid, "弟弟", "Younger brother", "Dìdi");
        database.AddWord(unit3Lesson1Guid, "妹妹", "Younger sister", "Mèimei");
        database.AddWord(unit3Lesson1Guid, "爷爷", "Grandfather", "Yéye");
        database.AddWord(unit3Lesson1Guid, "奶奶", "Grandmother", "Nǎinai");
        database.AddWord(unit3Lesson1Guid, "叔叔", "Uncle", "Shūshu");
        database.AddWord(unit3Lesson1Guid, "阿姨", "Aunt", "Āyí");

        // Lesson 2: Food and Drink
        string unit3Lesson2Guid = Guid.NewGuid().ToString();
        _database.Lessons.Add(new Lesson()
        {
            LessonId = unit3Lesson2Guid,
            Name = "Food and Drink",
            Translation = "食物和饮料",
            UnitId = unit3Guid
        });
        _database.SaveChanges();
        database.AddWord(unit3Lesson2Guid, "米饭", "Rice", "Mǐfàn");
        database.AddWord(unit3Lesson2Guid, "面条", "Noodles", "Miàntiáo");
        database.AddWord(unit3Lesson2Guid, "包子", "Steamed bun", "Bāozi");
        database.AddWord(unit3Lesson2Guid, "面包", "Bread", "Miànbāo");
        database.AddWord(unit3Lesson2Guid, "鸡蛋", "Egg", "Jīdàn");
        database.AddWord(unit3Lesson2Guid, "牛奶", "Milk", "Niúnǎi");
        database.AddWord(unit3Lesson2Guid, "茶", "Tea", "Chá");
        database.AddWord(unit3Lesson2Guid, "咖啡", "Coffee", "Kāfēi");
        database.AddWord(unit3Lesson2Guid, "水", "Water", "Shuǐ");
        database.AddWord(unit3Lesson2Guid, "果汁", "Juice", "Guǒzhī");

        // Lesson 3: Animals
        string unit3Lesson3Guid = Guid.NewGuid().ToString();
        _database.Lessons.Add(new Lesson()
        {
            LessonId = unit3Lesson3Guid,
            Name = "Animals",
            Translation = "动物",
            UnitId = unit3Guid
        });
        _database.SaveChanges();
        database.AddWord(unit3Lesson3Guid, "狗", "Dog", "Gǒu");
        database.AddWord(unit3Lesson3Guid, "猫", "Cat", "Māo");
        database.AddWord(unit3Lesson3Guid, "兔子", "Rabbit", "Tùzi");
        database.AddWord(unit3Lesson3Guid, "鸟", "Bird", "Niǎo");
        database.AddWord(unit3Lesson3Guid, "鱼", "Fish", "Yú");
        database.AddWord(unit3Lesson3Guid, "马", "Horse", "Mǎ");
        database.AddWord(unit3Lesson3Guid, "牛", "Cow", "Niú");
        database.AddWord(unit3Lesson3Guid, "羊", "Sheep", "Yáng");
        database.AddWord(unit3Lesson3Guid, "猪", "Pig", "Zhū");
        database.AddWord(unit3Lesson3Guid, "鸡", "Chicken", "Jī");
    }
    
    public static void AddWordsForUnit4(Database database, ApplicationDbContext _database)
{
    string unit4Guid = Guid.NewGuid().ToString();
    
    _database.Units.Add(new Unit()
    {
        UnitId = unit4Guid,
        Name = "Family and Relationships"
    });
    _database.SaveChanges();
    
    // Lesson 1: Weather
    string unit4Lesson1Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit4Lesson1Guid,
        Name = "Weather",
        Translation = "天气",
        UnitId = unit4Guid
    });
_database.SaveChanges();
database.AddWord(unit4Lesson1Guid, "晴天", "Sunny day", "Qíngtiān");
    database.AddWord(unit4Lesson1Guid, "阴天", "Cloudy day", "Yīntiān");
    database.AddWord(unit4Lesson1Guid, "雨天", "Rainy day", "Yǔtiān");
    database.AddWord(unit4Lesson1Guid, "雪天", "Snowy day", "Xuětiān");
    database.AddWord(unit4Lesson1Guid, "风", "Wind", "Fēng");
    database.AddWord(unit4Lesson1Guid, "气温", "Temperature", "Qìwēn");
    database.AddWord(unit4Lesson1Guid, "多云", "Partly cloudy", "Duōyún");
    database.AddWord(unit4Lesson1Guid, "台风", "Typhoon", "Táifēng");
    database.AddWord(unit4Lesson1Guid, "暴风雨", "Storm", "Bàofēngyǔ");
    database.AddWord(unit4Lesson1Guid, "天气预报", "Weather forecast", "Tiānqì yùbào");

    // Lesson 2: Clothing
    string unit4Lesson2Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit4Lesson2Guid,
        Name = "Clothing",
        Translation = "服装",
        UnitId = unit4Guid
    });
_database.SaveChanges();
database.AddWord(unit4Lesson2Guid, "衣服", "Clothes", "Yīfu");
    database.AddWord(unit4Lesson2Guid, "裤子", "Pants", "Kùzi");
    database.AddWord(unit4Lesson2Guid, "外套", "Jacket", "Wàitào");
    database.AddWord(unit4Lesson2Guid, "帽子", "Hat", "Màozi");
    database.AddWord(unit4Lesson2Guid, "鞋子", "Shoes", "Xiézi");
    database.AddWord(unit4Lesson2Guid, "手套", "Gloves", "Shǒutào");
    database.AddWord(unit4Lesson2Guid, "围巾", "Scarf", "Wéijīn");
    database.AddWord(unit4Lesson2Guid, "衬衫", "Shirt", "Chènshān");
    database.AddWord(unit4Lesson2Guid, "裙子", "Skirt", "Qúnzi");
    database.AddWord(unit4Lesson2Guid, "领带", "Necktie", "Lǐngdài");

    // Lesson 3: Daily Routine
    string unit4Lesson3Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit4Lesson3Guid,
        Name = "Daily Routine",
        Translation = "日常生活",
        UnitId = unit4Guid
    });
_database.SaveChanges();
database.AddWord(unit4Lesson3Guid, "起床", "Wake up", "Qǐchuáng");
    database.AddWord(unit4Lesson3Guid, "洗脸", "Wash face", "Xǐliǎn");
    database.AddWord(unit4Lesson3Guid, "刷牙", "Brush teeth", "Shuāyá");
    database.AddWord(unit4Lesson3Guid, "吃早饭", "Have breakfast", "Chī zǎofàn");
    database.AddWord(unit4Lesson3Guid, "上班", "Go to work", "Shàngbān");
    database.AddWord(unit4Lesson3Guid, "午休", "Take a nap", "Wǔxiū");
    database.AddWord(unit4Lesson3Guid, "吃午饭", "Have lunch", "Chī wǔfàn");
    database.AddWord(unit4Lesson3Guid, "下班", "Get off work", "Xiàbān");
    database.AddWord(unit4Lesson3Guid, "吃晚饭", "Have dinner", "Chī wǎnfàn");
    database.AddWord(unit4Lesson3Guid, "睡觉", "Go to bed", "Shuìjiào");
}

public static void AddWordsForUnit5(Database database, ApplicationDbContext _database)
{
    string unit5Guid = Guid.NewGuid().ToString();
    
    _database.Units.Add(new Unit()
    {
        UnitId = unit5Guid,
        Name = "Days, Months, and Time"
    });
    _database.SaveChanges();
    
    // Lesson 1: School
    string unit5Lesson1Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit5Lesson1Guid,
        Name = "School",
        Translation = "学校",
        UnitId = unit5Guid
    });
_database.SaveChanges();
database.AddWord(unit5Lesson1Guid, "学生", "Student", "Xuéshēng");
    database.AddWord(unit5Lesson1Guid, "老师", "Teacher", "Lǎoshī");
    database.AddWord(unit5Lesson1Guid, "课堂", "Classroom", "Kètáng");
    database.AddWord(unit5Lesson1Guid, "书", "Book", "Shū");
    database.AddWord(unit5Lesson1Guid, "笔", "Pen", "Bǐ");
    database.AddWord(unit5Lesson1Guid, "作业", "Homework", "Zuòyè");
    database.AddWord(unit5Lesson1Guid, "考试", "Exam", "Kǎoshì");
    database.AddWord(unit5Lesson1Guid, "学校", "School", "Xuéxiào");
    database.AddWord(unit5Lesson1Guid, "课程", "Course", "Kèchéng");
    database.AddWord(unit5Lesson1Guid, "校服", "School uniform", "Xiàofú");

    // Lesson 2: Hobbies
    string unit5Lesson2Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit5Lesson2Guid,
        Name = "Hobbies",
        Translation = "爱好",
        UnitId = unit5Guid
    });
_database.SaveChanges();
database.AddWord(unit5Lesson2Guid, "音乐", "Music", "Yīnyuè");
    database.AddWord(unit5Lesson2Guid, "运动", "Sports", "Yùndòng");
    database.AddWord(unit5Lesson2Guid, "旅游", "Traveling", "Lǚyóu");
    database.AddWord(unit5Lesson2Guid, "看电影", "Watch movies", "Kàn diànyǐng");
    database.AddWord(unit5Lesson2Guid, "画画", "Drawing", "Huà huà");
    database.AddWord(unit5Lesson2Guid, "游泳", "Swimming", "Yóuyǒng");
    database.AddWord(unit5Lesson2Guid, "读书", "Reading", "Dúshū");
    database.AddWord(unit5Lesson2Guid, "唱歌", "Singing", "Chànggē");
    database.AddWord(unit5Lesson2Guid, "购物", "Shopping", "Gòuwù");
    database.AddWord(unit5Lesson2Guid, "打篮球", "Play basketball", "Dǎ lánqiú");
}
public static void AddWordsForUnit6(Database database, ApplicationDbContext _database)
{
    string unit6Guid = Guid.NewGuid().ToString();
    
    _database.Units.Add(new Unit()
    {
        UnitId = unit6Guid,
        Name = "Food and Drinks"
    });
    _database.SaveChanges();
    
    // Lesson 1: Travel
    string unit6Lesson1Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit6Lesson1Guid,
        Name = "Travel",
        Translation = "旅行",
        UnitId = unit6Guid
    });
_database.SaveChanges();
database.AddWord(unit6Lesson1Guid, "机票", "Plane ticket", "Jīpiào");
    database.AddWord(unit6Lesson1Guid, "火车票", "Train ticket", "Huǒchēpiào");
    database.AddWord(unit6Lesson1Guid, "地图", "Map", "Dìtú");
    database.AddWord(unit6Lesson1Guid, "护照", "Passport", "Hùzhào");
    database.AddWord(unit6Lesson1Guid, "签证", "Visa", "Qiānzhèng");
    database.AddWord(unit6Lesson1Guid, "旅馆", "Hotel", "Lǚguǎn");
    database.AddWord(unit6Lesson1Guid, "行李", "Luggage", "Xínglǐ");
    database.AddWord(unit6Lesson1Guid, "导游", "Tour guide", "Dǎoyóu");
    database.AddWord(unit6Lesson1Guid, "景点", "Tourist attraction", "Jǐngdiǎn");
    database.AddWord(unit6Lesson1Guid, "语言", "Language", "Yǔyán");

    // Lesson 2: Health
    string unit6Lesson2Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit6Lesson2Guid,
        Name = "Health",
        Translation = "健康",
        UnitId = unit6Guid
    });
_database.SaveChanges();
database.AddWord(unit6Lesson2Guid, "医院", "Hospital", "Yīyuàn");
    database.AddWord(unit6Lesson2Guid, "医生", "Doctor", "Yīshēng");
    database.AddWord(unit6Lesson2Guid, "药", "Medicine", "Yào");
    database.AddWord(unit6Lesson2Guid, "病人", "Patient", "Bìngrén");
    database.AddWord(unit6Lesson2Guid, "牙医", "Dentist", "Yáyī");
    database.AddWord(unit6Lesson2Guid, "健康", "Health", "Jiànkāng");
    database.AddWord(unit6Lesson2Guid, "感冒", "Cold", "Gǎnmào");
    database.AddWord(unit6Lesson2Guid, "发烧", "Fever", "Fāshāo");
    database.AddWord(unit6Lesson2Guid, "头疼", "Headache", "Tóuténg");
    database.AddWord(unit6Lesson2Guid, "肚子疼", "Stomachache", "Dùzi téng");

    // Lesson 3: Technology
    string unit6Lesson3Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit6Lesson3Guid,
        Name = "Technology",
        Translation = "科技",
        UnitId = unit6Guid
    });
_database.SaveChanges();
database.AddWord(unit6Lesson3Guid, "电脑", "Computer", "Diànnǎo");
    database.AddWord(unit6Lesson3Guid, "手机", "Mobile phone", "Shǒujī");
    database.AddWord(unit6Lesson3Guid, "电视", "Television", "Diànshì");
    database.AddWord(unit6Lesson3Guid, "相机", "Camera", "Xiàngjī");
    database.AddWord(unit6Lesson3Guid, "网络", "Internet", "Wǎngluò");
    database.AddWord(unit6Lesson3Guid, "手机应用", "Mobile app", "Shǒujī yìngyòng");
    database.AddWord(unit6Lesson3Guid, "充电器", "Charger", "Chōngdiànqì");
    database.AddWord(unit6Lesson3Guid, "平板电脑", "Tablet", "Píngbǎn diànnǎo");
    database.AddWord(unit6Lesson3Guid, "键盘", "Keyboard", "Jiàn​pán");
    database.AddWord(unit6Lesson3Guid, "鼠标", "Mouse", "Shǔbiāo");
}

public static void AddWordsForUnit7(Database database, ApplicationDbContext _database)
{
    string unit7Guid = Guid.NewGuid().ToString();
 
    _database.Units.Add(new Unit()
    {
        UnitId = unit7Guid,
        Name = "Colors and Shapes"
    });
    _database.SaveChanges();
    
    // Lesson 1: Shopping
    string unit7Lesson1Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit7Lesson1Guid,
        Name = "Shopping",
        Translation = "购物",
        UnitId = unit7Guid
    });
_database.SaveChanges();
database.AddWord(unit7Lesson1Guid, "购物中心", "Shopping mall", "Gòuwù zhōngxīn");
    database.AddWord(unit7Lesson1Guid, "商店", "Store", "Shāngdiàn");
    database.AddWord(unit7Lesson1Guid, "超市", "Supermarket", "Chāoshì");
    database.AddWord(unit7Lesson1Guid, "市场", "Market", "Shìchǎng");
    database.AddWord(unit7Lesson1Guid, "衣服", "Clothes", "Yīfu");
    database.AddWord(unit7Lesson1Guid, "鞋子", "Shoes", "Xiézi");
    database.AddWord(unit7Lesson1Guid, "包", "Bag", "Bāo");
    database.AddWord(unit7Lesson1Guid, "化妆品", "Cosmetics", "Huàzhuāngpǐn");
    database.AddWord(unit7Lesson1Guid, "电器", "Electronics", "Diànqì");
    database.AddWord(unit7Lesson1Guid, "食品", "Food", "Shípǐn");

    // Lesson 2: At the Restaurant
    string unit10Lesson3Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit10Lesson3Guid,
        Name = "At the Restaurant",
        Translation = "在餐厅",
        UnitId = unit7Guid
    });
    _database.SaveChanges();
    database.AddWord(unit10Lesson3Guid, "菜单", "Menu", "Càidān");
    database.AddWord(unit10Lesson3Guid, "服务员", "Waiter", "Fúwùyuán");
    database.AddWord(unit10Lesson3Guid, "点菜", "Order food", "Diǎn cài");
    database.AddWord(unit10Lesson3Guid, "餐具", "Tableware", "Cānjù");
    database.AddWord(unit10Lesson3Guid, "餐巾", "Napkin", "Cānjīn");
    database.AddWord(unit10Lesson3Guid, "主菜", "Main course", "Zhǔ cài");
    database.AddWord(unit10Lesson3Guid, "甜点", "Dessert", "Tiándiǎn");
    database.AddWord(unit10Lesson3Guid, "饮料", "Beverage", "Yǐnliào");
    database.AddWord(unit10Lesson3Guid, "付款", "Pay the bill", "Fùkuǎn");
    database.AddWord(unit10Lesson3Guid, "打包", "Takeout", "Dǎbāo");
    database.AddWord(unit10Lesson3Guid, "小费", "Tip", "Xiǎofèi");
}
public static void AddWordsForUnit8(Database database,ApplicationDbContext _database)
{
    string unit8Guid = Guid.NewGuid().ToString();
    
    _database.Units.Add(new Unit()
    {
        UnitId = unit8Guid,
        Name = "Clothing and Fashion"
    });
    _database.SaveChanges();
    
    // Lesson 1: Festivals
    string unit8Lesson1Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit8Lesson1Guid,
        Name = "Festivals",
        Translation = "节日",
        UnitId = unit8Guid
    });
_database.SaveChanges();
database.AddWord(unit8Lesson1Guid, "春节", "Spring Festival", "Chūnjié");
    database.AddWord(unit8Lesson1Guid, "中秋节", "Mid-Autumn Festival", "Zhōngqiū jié");
    database.AddWord(unit8Lesson1Guid, "元宵节", "Lantern Festival", "Yuánxiāo jié");
    database.AddWord(unit8Lesson1Guid, "清明节", "Qingming Festival", "Qīngmíng jié");
    database.AddWord(unit8Lesson1Guid, "端午节", "Dragon Boat Festival", "Duānwǔ jié");
    database.AddWord(unit8Lesson1Guid, "国庆节", "National Day", "Guóqìng jié");
    database.AddWord(unit8Lesson1Guid, "圣诞节", "Christmas", "Shèngdàn jié");
    database.AddWord(unit8Lesson1Guid, "情人节", "Valentine's Day", "Qíngrén jié");
    database.AddWord(unit8Lesson1Guid, "万圣节", "Halloween", "Wànshèng jié");
    database.AddWord(unit8Lesson1Guid, "元旦", "New Year's Day", "Yuándàn");

    // Lesson 2: Sports
    string unit8Lesson2Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit8Lesson2Guid,
        Name = "Sports",
        Translation = "体育运动",
        UnitId = unit8Guid
    });
_database.SaveChanges();
database.AddWord(unit8Lesson2Guid, "足球", "Football", "Zúqiú");
    database.AddWord(unit8Lesson2Guid, "篮球", "Basketball", "Lánqiú");
    database.AddWord(unit8Lesson2Guid, "网球", "Tennis", "Wǎngqiú");
    database.AddWord(unit8Lesson2Guid, "乒乓球", "Table tennis", "Pīngpāngqiú");
    database.AddWord(unit8Lesson2Guid, "羽毛球", "Badminton", "Yǔmáoqiú");
    database.AddWord(unit8Lesson2Guid, "游泳", "Swimming", "Yóuyǒng");
    database.AddWord(unit8Lesson2Guid, "跑步", "Running", "Pǎobù");
    database.AddWord(unit8Lesson2Guid, "体操", "Gymnastics", "Tǐcāo");
    database.AddWord(unit8Lesson2Guid, "跳绳", "Skipping rope", "Tiàoshéng");
    database.AddWord(unit8Lesson2Guid, "滑冰", "Ice skating", "Huábīng");

    // Lesson 3: Emotions
    string unit8Lesson3Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit8Lesson3Guid,
        Name = "Emotions",
        Translation = "情感",
        UnitId = unit8Guid
    });
_database.SaveChanges();
database.AddWord(unit8Lesson3Guid, "开心", "Happy", "Kāixīn");
    database.AddWord(unit8Lesson3Guid, "伤心", "Sad", "Shāngxīn");
    database.AddWord(unit8Lesson3Guid, "生气", "Angry", "Shēngqì");
    database.AddWord(unit8Lesson3Guid, "害怕", "Afraid", "Hàipà");
    database.AddWord(unit8Lesson3Guid, "紧张", "Nervous", "Jǐnzhāng");
    database.AddWord(unit8Lesson3Guid, "尴尬", "Embarrassed", "Gāngà");
    database.AddWord(unit8Lesson3Guid, "惊讶", "Surprised", "Jīngyà");
    database.AddWord(unit8Lesson3Guid, "幸福", "Content", "Xìngfú");
    database.AddWord(unit8Lesson3Guid, "困惑", "Confused", "Kùnhuò");
    database.AddWord(unit8Lesson3Guid, "沮丧", "Frustrated", "Jǔsàng");
}

public static void AddWordsForUnit9(Database database, ApplicationDbContext _database)
{
    string unit9Guid = Guid.NewGuid().ToString();
    
    _database.Units.Add(new Unit()
             {
                 UnitId = unit9Guid,
                    Name = "Weather and Seasons"
             });
             _database.SaveChanges();
             
    // Lesson 1: Occupations
    string unit9Lesson1Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit9Lesson1Guid,
        Name = "Occupations",
        Translation = "职业",
        UnitId = unit9Guid
    });
_database.SaveChanges();
database.AddWord(unit9Lesson1Guid, "医生", "Doctor", "Yīshēng");
    database.AddWord(unit9Lesson1Guid, "老师", "Teacher", "Lǎoshī");
    database.AddWord(unit9Lesson1Guid, "工程师", "Engineer", "Gōngchéngshī");
    database.AddWord(unit9Lesson1Guid, "律师", "Lawyer", "Lǜshī");
    database.AddWord(unit9Lesson1Guid, "护士", "Nurse", "Hùshì");
    database.AddWord(unit9Lesson1Guid, "警察", "Police officer", "Jǐngchá");
    database.AddWord(unit9Lesson1Guid, "厨师", "Chef", "Chúshī");
    database.AddWord(unit9Lesson1Guid, "演员", "Actor/Actress", "Yǎnyuán");
    database.AddWord(unit9Lesson1Guid, "记者", "Journalist", "Jìzhě");
    database.AddWord(unit9Lesson1Guid, "司机", "Driver", "Sījī");

    // Lesson 2: Nature
    string unit9Lesson2Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit9Lesson2Guid,
        Name = "Nature",
        Translation = "自然",
        UnitId = unit9Guid
    });
_database.SaveChanges();
database.AddWord(unit9Lesson2Guid, "树", "Tree", "Shù");
    database.AddWord(unit9Lesson2Guid, "花", "Flower", "Huā");
    database.AddWord(unit9Lesson2Guid, "草", "Grass", "Cǎo");
    database.AddWord(unit9Lesson2Guid, "山", "Mountain", "Shān");
    database.AddWord(unit9Lesson2Guid, "水", "Water", "Shuǐ");
    database.AddWord(unit9Lesson2Guid, "天空", "Sky", "Tiānkōng");
    database.AddWord(unit9Lesson2Guid, "太阳", "Sun", "Tàiyáng");
    database.AddWord(unit9Lesson2Guid, "月亮", "Moon", "Yuèliàng");
    database.AddWord(unit9Lesson2Guid, "星星", "Star", "Xīngxīng");
    database.AddWord(unit9Lesson2Guid, "风", "Wind", "Fēng");
}

public static void AddWordsForUnit10(Database database, ApplicationDbContext _database)
{
    string unit10Guid = Guid.NewGuid().ToString();

    _database.Units.Add(new Unit()
    {
        UnitId = unit10Guid,
        Name = "Travel and Transportation"
    });
    _database.SaveChanges();
    
    // Lesson 1: Places in Town
    string unit10Lesson1Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit10Lesson1Guid,
        Name = "Places in Town",
        Translation = "城市地点",
        UnitId = unit10Guid
    });
    _database.SaveChanges();
    database.AddWord(unit10Lesson1Guid, "银行", "Bank", "Yínháng");
    database.AddWord(unit10Lesson1Guid, "餐厅", "Restaurant", "Cāntīng");
    database.AddWord(unit10Lesson1Guid, "超市", "Supermarket", "Chāoshì");
    database.AddWord(unit10Lesson1Guid, "医院", "Hospital", "Yīyuàn");
    database.AddWord(unit10Lesson1Guid, "学校", "School", "Xuéxiào");
    database.AddWord(unit10Lesson1Guid, "电影院", "Cinema", "Diànyǐngyuàn");
    database.AddWord(unit10Lesson1Guid, "火车站", "Train station", "Huǒchē zhàn");
    database.AddWord(unit10Lesson1Guid, "图书馆", "Library", "Túshūguǎn");
    database.AddWord(unit10Lesson1Guid, "公园", "Park", "Gōngyuán");
    database.AddWord(unit10Lesson1Guid, "邮局", "Post office", "Yóujú");

    // Lesson 2: Giving Directions
    string unit10Lesson2Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit10Lesson2Guid,
        Name = "Giving Directions",
        Translation = "指路",
        UnitId = unit10Guid
    });
    _database.SaveChanges();
    database.AddWord(unit10Lesson2Guid, "左转", "Turn left", "Zuǒ zhuǎn");
    database.AddWord(unit10Lesson2Guid, "右转", "Turn right", "Yòu zhuǎn");
    database.AddWord(unit10Lesson2Guid, "直走", "Go straight", "Zhí zǒu");
    database.AddWord(unit10Lesson2Guid, "前进", "Go ahead", "Qiánjìn");
    database.AddWord(unit10Lesson2Guid, "往回走", "Go back", "Wǎng huí zǒu");
    database.AddWord(unit10Lesson2Guid, "第一个路口", "First intersection", "Dì yī gè lùkǒu");
    database.AddWord(unit10Lesson2Guid, "第二个红绿灯", "Second traffic light", "Dì èr gè hónglǜdēng");
    database.AddWord(unit10Lesson2Guid, "过桥", "Cross the bridge", "Guò qiáo");
    database.AddWord(unit10Lesson2Guid, "经过公园", "Pass by the park", "Jīngguò gōngyuán");
    database.AddWord(unit10Lesson2Guid, "沿着这条街走", "Walk along this street", "Yánzhe zhè tiáo jiē zǒu");
    
    // Lesson 3: Transportation
    string unit7Lesson2Guid = Guid.NewGuid().ToString();
    _database.Lessons.Add(new Lesson()
    {
        LessonId = unit7Lesson2Guid,
        Name = "Transportation",
        Translation = "交通",
        UnitId = unit10Guid
    });
    _database.SaveChanges();
    database.AddWord(unit7Lesson2Guid, "公共汽车", "Bus", "Gōnggòng qìchē");
    database.AddWord(unit7Lesson2Guid, "地铁", "Subway", "Dìtiě");
    database.AddWord(unit7Lesson2Guid, "出租车", "Taxi", "Chūzūchē");
    database.AddWord(unit7Lesson2Guid, "火车", "Train", "Huǒchē");
    database.AddWord(unit7Lesson2Guid, "飞机", "Airplane", "Fēijī");
    database.AddWord(unit7Lesson2Guid, "自行车", "Bicycle", "Zìxíngchē");
    database.AddWord(unit7Lesson2Guid, "摩托车", "Motorcycle", "Mótuōchē");
    database.AddWord(unit7Lesson2Guid, "船", "Boat", "Chuán");
    database.AddWord(unit7Lesson2Guid, "站", "Station", "Zhàn");
    database.AddWord(unit7Lesson2Guid, "机场", "Airport", "Jīchǎng");
}
}
