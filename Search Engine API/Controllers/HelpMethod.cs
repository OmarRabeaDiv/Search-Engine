using System.Text.RegularExpressions;

namespace Search_Engine_API.Controllers
{
    public static class HelpMethod
    {
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
}
