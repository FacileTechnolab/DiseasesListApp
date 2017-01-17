using System;
using System.Collections.Generic;
using System.Linq;
using DiseasesList.Model.DataModels;
using DiseasesList.Model.Interfaces;
using DiseasesList.Repository.Interfaces;
using DiseasesList.Model.ViewModels.HealthTopic;

namespace DiseasesList.Repository.Objects
{
    public class HealthTopicRepo : IHealthTopic
    {
        private IDbContext _dbContext;

        public HealthTopicRepo(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<HealthTopicListModel> GetByTitle(string title)
        {
            return _dbContext.HealthTopics.Where(x => x.Title.Contains(title)).ToList().Select(x=>new HealthTopicListModel {Id = x.Id,Title=x.Title}).ToList();
        }

        public HealthTopic GetById(long id)
        {
            return _dbContext.HealthTopics.Where(x => x.Id == id).FirstOrDefault();
        }
    }
}
