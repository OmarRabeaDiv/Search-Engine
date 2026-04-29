using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Search_Engine_API.Models;
using System.Text.RegularExpressions;

namespace Search_Engine_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvertedIndexController : ControllerBase
    {
        private readonly ProjectContext context;

        public InvertedIndexController()
        {
            context = new ProjectContext();
        }

        [HttpGet("Build")]
        public IActionResult Build()
        {
            // 1. Read the JSON file
            string jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "ScrappedFile", "ScrappedFile.json");
            string json = System.IO.File.ReadAllText(jsonPath);
            var records = JsonConvert.DeserializeObject<List<Record>>(json);
            if (records is null) return NoContent();
            foreach (var record in records)
            {
                // 2. Skip empty content
                if (string.IsNullOrWhiteSpace(record.Text)) continue;

                // 3. Tokenize the text
                var words = Tokenize(record.Text);

                // 4. Count frequencies
                var freqMap = new Dictionary<string, int>();
                int con = 0;
                foreach (var word in words)
                {
                    if (!freqMap.ContainsKey(word)) freqMap[word] = 0;
                    freqMap[word]++;
                    con++;
                    if (con % 100 == 0)
                    {
                        context.SaveChanges();
                        context.ChangeTracker.Clear();
                    }
                }

                // 5. Insert into database
                foreach (var entry in freqMap)
                {
                    context.WordRecords.Add(
                        new WordRecord { Word = entry.Key, Url = record.Url, FreqCount = entry.Value }
                    );
                }
            }
            context.SaveChanges();
            return Content("Inverted index built successfully!");
        }

        // Tokenize Arabic and English text only
        [NonAction]
        public static List<string> Tokenize(string text)
        {
            // Keep ONLY Arabic and English characters, replace everything else with space
            string cleaned = Regex.Replace(text, @"[^a-zA-Z\u0600-\u06FF\s]", " ");

            // Split by whitespace, lowercase, remove short words
            var words = cleaned
                .ToLower()
                .Split(new[] { ' ', '\n', '\r', '\t' }, StringSplitOptions.RemoveEmptyEntries)
                .Where(w => w.Length > 2)
                .ToList();

            return words;
        }
    }
    public class Record
    {
        [JsonProperty("source")]
        public string? Source { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; } = null!;

        [JsonProperty("text")]
        public string Text { get; set; }= null!;
    }
}
