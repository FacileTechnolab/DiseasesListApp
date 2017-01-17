using System;
using System.Collections.Generic;
using DiseasesList.Model.DataModels;
using DiseasesList.Model.Interfaces;
using DiseasesList.Repository.Interfaces;
using DiseasesList.Repository.Providers;
using System.Linq;
using DiseasesList.Model.ViewModels.Account;

namespace DiseasesList.Repository.Objects
{
    public class UserRepo : IUser
    {
        private IDbContext _dbContext;

        public UserRepo(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<User> GetAll()
        {
            return _dbContext.Users.ToList(); ;
        }

        public User GetByUserEmail(string email)
        {
            var user = _dbContext.Users.Where(x => x.Email == email).FirstOrDefault();
            return user;
        }

        public long Create(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return user.Id;
        }

        public User Update(ProfileViewModel model,string email)
        {
            var user = _dbContext.Users.Where(x => x.Email == email).FirstOrDefault();
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
            user.UserName = model.UserName;
            _dbContext.SaveChanges();
            return user;
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }


        public bool IsUserExists(string email)
        {
           var user =  _dbContext.Users.Where(x => x.Email == email).FirstOrDefault();
            if (user != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public int ChangePassword(ChangePasswordViewModel model,string email)
        {
            var user = _dbContext.Users.Where(x => x.Email == email).FirstOrDefault();
            user.Password = PasswordHashProvider.HashPassword(model.NewPassword);
            var result = _dbContext.SaveChanges();
            return result;
        }
    }
}
