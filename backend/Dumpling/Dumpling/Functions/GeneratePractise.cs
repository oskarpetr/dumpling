using Dumpling.Data;

namespace Dumpling.Functions;

public class GeneratePractise
{
    public class MatchingModel
    {
        public List<List<string>> Pairs { get; set; }
        public List<List<string>> Answers { get; set; }    
    }
    
    public MatchingModel MatchingExercise(List<Word> words)
    {
        MatchingModel matching = new();
        List<List<string>> answers = new();
        
        for (var i = 0; i < 5; i++)
        {
            var random = new Random().Next(0, words.Count);
            while (answers.Exists(x => x.ElementAt(0).Contains(words.ElementAt(random).Value)))
            {
                random = new Random().Next(0, words.Count);
            };
                
            answers.Add(new List<string> { words.ElementAt(random).Value, words.ElementAt(random).Meaning });
        }
        
        List<List<string>> pairs = new();
        List<string> meanings = answers.Select(x => x.ElementAt(1)).ToList();
        foreach (var item in answers)
        {
            var random = new Random().Next(0, meanings.Count);
            
            pairs.Add(new List<string> { item.ElementAt(0), meanings.ElementAt(random) });
            meanings.RemoveAt(random);
        }
        
        matching.Answers = answers;
        matching.Pairs = pairs;

        return matching;
    }
    
    public class MultipleChoiceModel
    {
        public Word Answer { get; set; }
        public List<string> Options { get; set; }
    }

    public MultipleChoiceModel MultipleChoiceExercise(List<Word> words)
    {
        var practise = new MultipleChoiceModel();
        var randomWord = words.ElementAt(new Random().Next(0, words.Count));
        
        var options = new List<string>();

        for (var i = 0; i < 4; i++)
        {
            var random = new Random().Next(0, words.Count);
            while (options.Contains(words.ElementAt(random).Meaning) || random == words.IndexOf(randomWord))
            {
                random = new Random().Next(0, words.Count);
            };
            
            options.Add(words.ElementAt(random).Meaning);
        }

        int answerIndex = new Random().Next(0, 4);
        options[answerIndex] = randomWord.Meaning;
        
        practise = new MultipleChoiceModel()
        {
            Answer = randomWord,
            Options = options
        };
        
        return practise;
    }
    
    public MultipleChoiceModel PronunciationExercise(List<Word> words)
    {
        var practise = new MultipleChoiceModel();
        var randomWord = words.ElementAt(new Random().Next(0, words.Count));
        
        var options = new List<string>();

        for (var i = 0; i < 4; i++)
        {
            var random = new Random().Next(0, words.Count);
            while (options.Contains(words.ElementAt(random).Pronunciation) || random == words.IndexOf(randomWord) || randomWord.Pronunciation == words.ElementAt(random).Pronunciation)
            {
                random = new Random().Next(0, words.Count);
            };
            
            options.Add(words.ElementAt(random).Pronunciation);
        }

        int answerIndex = new Random().Next(0, 4);
        options[answerIndex] = randomWord.Pronunciation;
        
        practise = new MultipleChoiceModel()
        {
            Answer = randomWord,
            Options = options
        };
        
        return practise;
    }
    
    public class WritingModel
    {
        public Word Answer { get; set; }
        public string Meaning { get; set; }
    }
    
    public WritingModel WritingExercise(List<Word> words)
    {
        var practise = new WritingModel();
        var randomWord = words.ElementAt(new Random().Next(0, words.Count));

        practise = new()
        {
            Answer = randomWord,
            Meaning = randomWord.Meaning
        };
        
        return practise;
    }
}