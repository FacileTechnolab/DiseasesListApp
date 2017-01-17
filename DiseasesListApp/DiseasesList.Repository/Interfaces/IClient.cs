using DiseasesList.Model.DataModels;

namespace DiseasesList.Repository.Interfaces
{
    public interface IClient
    {
        Client GetById(string id);
    }
}
