using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Tulur.JsRouter.Example
{
	public class MvcApplication : HttpApplication
	{
		protected void Application_Start()
		{
			RouteTable.Routes.MapRoute("Default", "{*url}", new { controller = "Home", action = "Index" });
		}
	}

	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return File("~/index.html", "text/html");
		}
	}
}