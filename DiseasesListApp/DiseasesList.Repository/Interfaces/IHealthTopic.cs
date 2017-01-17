using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DiseasesList.Model.DataModels;
using DiseasesList.Model.ViewModels.HealthTopic;

namespace DiseasesList.Repository.Interfaces
{
    public interface IHealthTopic
    {
        List<HealthTopicListModel> GetByTitle(string title);
        HealthTopic GetById(long id);
    }
}
