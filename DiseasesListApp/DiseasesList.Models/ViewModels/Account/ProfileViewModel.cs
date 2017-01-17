using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiseasesList.Model.ViewModels.Account
{
    public class ProfileViewModel
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Maximum {1} characters allowed in first name")]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Allows only alphabets in first name")]
        public string FirstName { get; set; }


        [Required]
        [MaxLength(100, ErrorMessage = "Maximum {1} characters allowed in last name")]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Allows only alphabets in last name")]
        public string LastName { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Maximum {1} characters allowed in user name")]
        public string UserName { get; set; }


        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
