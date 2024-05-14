using Dumpling.Data;

namespace Dumpling.Functions;

public class GeneratePractise
{
    public class Matching
    {
        public List<List<string>> Pairs { get; set; }
        public List<List<string>> Answers { get; set; }    
    }
    
    public Matching MatchingExercise(List<Word> words)
    {
        Matching matching = new();
        List<List<string>> answers = new();
        
        for (var i = 0; i < 5; i++)
        {
            var random = new Random().Next(0, words.Count);
            while (answers.Any(x => x.Contains(words.ElementAt(random).Value)))
            {
                random = new Random().Next(0, words.Count);
            };
                
            answers.Add(new List<string> { words.ElementAt(random).Value, words.ElementAt(random).Meaning });
        }
        
        List<List<string>> pairs = new();
        foreach (var item in answers)
        {
            var random = new Random().Next(0, answers.Count);
            while (pairs.Any(x => x.Contains(answers.ElementAt(random).ElementAt(1))) || random == answers.IndexOf(item))
            {
                random = new Random().Next(0, answers.Count);
            };
            
            pairs.Add(new List<string> { item.ElementAt(0), answers.ElementAt(random).ElementAt(1) });
        }
        
        matching.Answers = answers;
        matching.Pairs = pairs;

        return matching;
    }
}