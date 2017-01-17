using Microsoft.Practices.Unity;
using DiseasesList.Model.Interfaces;
using DiseasesList.Model.DataContext;
using DiseasesList.Repository.Objects;
using DiseasesList.Repository.Interfaces;

namespace DiseasesList.Web
{
    public static class UnityConfig
    {
        public static UnityContainer container { get; set; }
        public static UnityContainer RegisterComponents()
        {
            container = new UnityContainer();
            container.RegisterType<IDbContext, DiseasesDataContext>(lifetimeManager: new HierarchicalLifetimeManager());
            container.RegisterType<IUser, UserRepo>(lifetimeManager: new HierarchicalLifetimeManager());
            container.RegisterType<IHealthTopic, HealthTopicRepo>(lifetimeManager: new HierarchicalLifetimeManager());
            container.RegisterType<IClient, ClientRepo>(lifetimeManager: new HierarchicalLifetimeManager());

            return container;
        }
    }
}