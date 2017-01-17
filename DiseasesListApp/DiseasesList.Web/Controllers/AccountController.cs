using System.Net.Http;
using System.Web.Http;
using DiseasesList.Repository.Interfaces;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using DiseasesList.Model.DataModels;
using System.Web.Http.Results;
using System.Threading.Tasks;
using System.Linq;
using DiseasesList.Model.Interfaces;
using DiseasesList.Model.ViewModels;
using System;
using DiseasesList.Repository.Providers;
using DiseasesList.Model.ViewModels.Account;

namespace DiseasesList.Web.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private IAuthenticationManager Authentication => Request.GetOwinContext().Authentication;
        private IUser _userRepo;
        public AccountController(IUser userRepo)
        {
            _userRepo = userRepo;
        }

        // POST api/Account/Logout
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return Ok();
        }

       
        [Route("Register")]
        [HttpPost]
        public async Task<IHttpActionResult> Register([FromBody]RegisterViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_userRepo.IsUserExists(model.Email)) //user is alreasy exists
                    {
                        return BadRequest(model.Email + " " + "is already taken");
                    }
                    else
                    {
                        var user = new User();
                        user.FirstName = model.FirstName;
                        user.LastName = model.LastName;
                        user.UserName = model.UserName;
                        user.Email = model.Email;
                        user.Password = PasswordHashProvider.HashPassword(model.Password);
                        var userId = _userRepo.Create(user);
                        string location = Request.RequestUri + "/" + user.Id.ToString();
                        return Created(location, new { Id = userId });
                    }
                }
                else
                {
                    return BadRequest(string.Join(" ", ModelState.Values.SelectMany(x => x.Errors).Select(e => e.ErrorMessage)));
                }
            }
            catch (Exception e)
            {
                return await ErrorResult(e);
            }
        }

        [Route("EditProfile")]
        [HttpPut]
        public async Task<IHttpActionResult> EditProfile([FromBody]ProfileViewModel model, string email)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_userRepo.IsUserExists(email))
                    {
                        //user try to update email which already exists
                        var currentUser = _userRepo.GetByUserEmail(email);
                        var user = _userRepo.GetByUserEmail(model.Email);
                        if (user != null)
                        {
                            if(currentUser.Id != user.Id)
                            {
                                return BadRequest(model.Email + " " + "is already taken");
                            }
                            else
                            {
                                var updatedUser = _userRepo.Update(model, email);
                                return Ok(updatedUser);
                            }
                        }
                        else
                        {
                            var updatedUser = _userRepo.Update(model, email);
                            return Ok(updatedUser);
                        }
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                else
                {
                    return BadRequest(string.Join(" ", ModelState.Values.SelectMany(x => x.Errors).Select(e => e.ErrorMessage)));
                }
            }
            catch (Exception e)
            {
                return await ErrorResult(e);
            }
        }

        [Route("ChangePassword")]
        [HttpPost]
        public async Task<IHttpActionResult> ChangePassword([FromBody]ChangePasswordViewModel model, string email)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = new User();
                    if (_userRepo.IsUserExists(email))
                    {
                        user = _userRepo.GetByUserEmail(email);
                        if (!PasswordHashProvider.ValidatePassword(model.OldPassword, user.Password))
                        {
                            return BadRequest("Wrong Password");
                        }
                        else
                        {
                            var result = _userRepo.ChangePassword(model, email);
                            return await SendResonse(result, "Your password changed successfully");
                        }
                    }
                    else
                    {
                        return BadRequest("No such user exists");
                    }
                }
                else
                {
                    return BadRequest(string.Join(" ", ModelState.Values.SelectMany(x => x.Errors).Select(e => e.ErrorMessage)));
                }
            }
            catch (Exception e)
            {
                return await ErrorResult(e);
            }
        }

        [Route("GetUserByEmail")]
        [HttpGet]
        public async Task<IHttpActionResult> GetUserByEmail(string email)
        {
            try
            {
                if (_userRepo.IsUserExists(email))
                {
                    var user = _userRepo.GetByUserEmail(email);
                    return Ok(user);
                }
                else
                {
                    return BadRequest("No such user exists");
                }
            }
            catch (Exception e)
            {
                return await ErrorResult(e);
            }
        }
        private async Task<IHttpActionResult> ErrorResult(Exception e)
        {
            string message = string.Empty;
            if (e.Message != null)
            {
                message = e.Message;
            }
            else
            {
                message = "Sorry something went wrong.Please try again later";
            }
            return BadRequest(message);
        }


        private async Task<IHttpActionResult> SendResonse(int result, string message)
        {
            if (result == 1)
            {
                return Ok(message);
            }
            else
            {
                return BadRequest("Something went wrong.Please try again");
            }
        }
    }
}
