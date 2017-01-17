using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DiseasesList.Model.DataModels;
using DiseasesList.Model.ViewModels.Account;

namespace DiseasesList.Repository.Interfaces
{
    public interface IUser
    {
        List<User> GetAll();
        User GetByUserEmail(string email);
        long Create(User user);
        User Update(ProfileViewModel model,string email);
        void Delete(int id);
        bool IsUserExists(string email);
        int ChangePassword(ChangePasswordViewModel model, string email);
    }
}
