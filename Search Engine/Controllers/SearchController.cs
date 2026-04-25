using Microsoft.AspNetCore.Mvc;

namespace Search_Engine.Controllers
{
    public class SearchController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Seach(string word)
        {

        }

        [HttpPost]
        public IActionResult Seach()
        {

        }

    }
}
