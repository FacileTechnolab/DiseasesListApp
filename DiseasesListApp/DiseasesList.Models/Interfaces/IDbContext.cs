using System.Data.Entity;
using DiseasesList.Model.DataModels;

namespace DiseasesList.Model.Interfaces
{
    public interface IDbContext
    {
        int SaveChanges();
        DbSet<HealthTopic> HealthTopics { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<Client> Clients { get; set; }
    }

}
