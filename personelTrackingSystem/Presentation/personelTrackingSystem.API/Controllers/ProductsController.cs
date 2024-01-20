//using personelTrackingSystem.Application.Abstractions;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace personelTrackingSystem.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ProductsController : ControllerBase
//    {
//        private readonly IProductService _productService;
//        public ProductsController(IProductService productService)
//        {
//            _productService = productService;
//        }
//        public IActionResult GetProducts()
//        {
//            var result = _productService.GetProducts();
//            return Ok(result);
//        }
//    }
//}
