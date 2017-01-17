using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(DiseasesList.Web.Startup))]

namespace DiseasesList.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
