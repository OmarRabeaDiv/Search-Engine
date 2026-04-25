using Microsoft.AspNetCore.Mvc;

namespace Search_Engine.Controllers
{
    public class SearchController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        //public IActionResult Search(string[] word) 
        //{
        //    return View();
        //}

    }
}
