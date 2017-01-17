using System.ComponentModel.DataAnnotations;

namespace DiseasesList.Model.DataModels
{
    public class Client
    {
        [Key]
        public int Id { get; set; }
        public string ClientId { get; set; }
        public string Secret { get; set; }
        public bool Active { get; set; }
    }
}
