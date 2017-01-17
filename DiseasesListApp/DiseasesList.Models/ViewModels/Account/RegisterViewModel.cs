using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiseasesList.Model.ViewModels.Account
{
    public class RegisterViewModel
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Maximum {1} characters allowed in firstName")]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Allows only alphabets in first name")]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Maximum {1} characters allowed in lastName")]
        [RegularExpression(@"^[a-zA-Z]*$", ErrorMessage = "Allows only alphabets in last name")]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Maximum {1} characters allowed in user name")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
