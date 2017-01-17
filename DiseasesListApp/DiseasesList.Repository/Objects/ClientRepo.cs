using DiseasesList.Model.DataModels;
using DiseasesList.Model.Interfaces;
using DiseasesList.Repository.Interfaces;
using DiseasesList.Repository.Providers;
using System.Linq;

namespace DiseasesList.Repository.Objects
{
    public class ClientRepo : IClient
    {
        private IDbContext _dbContext;

        public ClientRepo(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Client GetById(string id)
        {
            return _dbContext.Clients.Where(x => x.ClientId == id).FirstOrDefault();
        }


    }
}
