using Microsoft.AspNetCore.Mvc;
using Search_Engine_API.Models;

namespace Search_Engine_API.Controllers
{
    //loc/api/Search
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        /*
            http//:los/api/con/se?inputvAlue=seif
        */
        public ActionResult<Dictionary<string, List<string>>> Search([FromQuery]string inputValue)
        {
            if(inputValue is null)return BadRequest("no value sent");
            var words = inputValue.Split(new char[] { ' ', ',', '/', '\n', '\t', '&' });
            if (words?.Length < 1) return BadRequest("Bad value is sent");
            Dictionary<string,List<string>> ResponseData = new Dictionary<string, List<string>>();
            using (var context = new ProjectContext())
            {
                List<string>? mainList = context.WordRecords.Where(x => x.Word == words[0]).Select(x => x.Url).ToList();
                for (int i = 1; i < words.Length; i++)
                {
                    List<string>list= context.WordRecords.Where(x => x.Word == words[i]).Select(x => x.Url).ToList();
                    mainList=mainList.Intersect(list).ToList();
                }
                foreach (var word in words)
                {
                    ResponseData[word] = mainList;
                }
                return ResponseData;
            }
        }
    }
}