using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using DiseasesList.Model.DataModels;
using DiseasesList.Model.Interfaces;

namespace DiseasesList.Model.DataContext
{
    public class DiseasesDataContext : DbContext, IDbContext
    {
        public DiseasesDataContext() : base("name=HealthCareDBConnection")
        {
        }

        public DbSet<HealthTopic> HealthTopics { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
    }
}
