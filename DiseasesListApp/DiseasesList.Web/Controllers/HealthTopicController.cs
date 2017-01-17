using System.Collections.Generic;
using System.Web.Http;
using DiseasesList.Repository.Interfaces;
using DiseasesList.Model.DataModels;
using DiseasesList.Model.ViewModels;
using DiseasesList.Model.ViewModels.HealthTopic;

namespace DiseasesList.Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/HealthTopic")]
    public class HealthTopicController : ApiController
    {
        private IHealthTopic _healthtopicRepo;
        public HealthTopicController(IHealthTopic healthtopicRepo)
        {
            _healthtopicRepo = healthtopicRepo;
        }

        [HttpGet]
        [Route("GetByTitle")]
        public IEnumerable<HealthTopicListModel> GetByTitle(string title)
        {
            return _healthtopicRepo.GetByTitle(title);
        }

        [HttpGet]
        [Route("GetById")]
        public HealthTopic GetById(long id)
        {
            return _healthtopicRepo.GetById(id);
        }

    }
}
