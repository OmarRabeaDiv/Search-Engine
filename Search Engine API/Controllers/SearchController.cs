using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Search_Engine_API.Models;

namespace Search_Engine_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public ActionResult<Dictionary<string, List<string>>> Search([FromQuery]string inputValue)
        {
            if(inputValue is null)return BadRequest("no value sent");
            var words = inputValue.Split(new char[] { ' ', ',', '/', '\n', '\t', '&' });
            if (words.Length < 1) return BadRequest("Bad value is sent");
            Dictionary<string,List<string>> ResponseData = new Dictionary<string, List<string>>();
            using (var context = new ProjectContext())
            {
                foreach(var word in words)
                {
                    var list=context.WordRecords.Where(x => x.Word == word).Select(x => x.Url).ToList();
                    ResponseData[word] = list;
                }
            }
            return ResponseData;
        }
    }
}
