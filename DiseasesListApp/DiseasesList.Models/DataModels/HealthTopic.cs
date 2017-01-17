using System;
using System.ComponentModel.DataAnnotations;

namespace DiseasesList.Model.DataModels
{
    public class HealthTopic
    {
        [Key]
        public long Id { get; set; }
        public string Title { get; set; }
        public string Language { get; set; }
        public string Url { get; set; }
        public DateTime DateCreated { get; set; }
        public string FullSummary { get; set; }
    }
}
