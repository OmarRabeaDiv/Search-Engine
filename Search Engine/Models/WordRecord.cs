using Microsoft.EntityFrameworkCore;

namespace Search_Engine.Models
{
    public class WordRecord
    {
        public int Id { get; set; }
        public string Word { get; set; }
        public int FreqCount { get; set; }
        public string Url { get; set; }
    }
}