using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using integrate_dotnet_core_create_react_app.Models;
using System.Net;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace integrate_dotnet_core_create_react_app.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private static readonly IList<Products> _comments;
        static ProductsController()
        {
            
        }
        [HttpGet]
        public string Index()
        {
            string content="";
            HttpClient client = new HttpClient();

            // Set the base address of the web service
            client.BaseAddress = new Uri("http://alltheclouds.com.au/api/");

            // Add any necessary headers to the request
            client.DefaultRequestHeaders.Add("api-key", "API-3LK61UUJWG0V3I6");

            // Call the web service using the appropriate HTTP method and endpoint
            HttpResponseMessage response = client.GetAsync("Products").Result;

            // Check the status code of the response
            if (response.IsSuccessStatusCode)
            {
                content = response.Content.ReadAsStringAsync().Result;
            }
            else
            {
                // Handle the error response
                
            }

            return content;

        }
    }
}
