using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DiseasesList.Model.DataModels;
using DiseasesList.Repository.Interfaces;
using DiseasesList.Repository.Providers;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Practices.Unity;

namespace DiseasesList.Web.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly IUser _userRepo;
        private readonly IClient _clientRepo;

        public ApplicationOAuthProvider()
        {
            _userRepo = UnityConfig.container.Resolve<IUser>();
            _clientRepo = UnityConfig.container.Resolve<IClient>();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            if (string.IsNullOrEmpty(context.UserName) || string.IsNullOrEmpty(context.Password))
            {
                context.SetError("invalid_grant", "The username or password is incorrect.");
                return;
            }

            var user = _userRepo.GetByUserEmail(context.UserName);
            if (user == null)
            {
                context.SetError("invalid_username", "The username is not correct.");
                return;
            }
            if (!PasswordHashProvider.ValidatePassword(context.Password, user.Password))
            {
                context.SetError("invalid_password", "The password is not correct.");
                return;
            }
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));

            var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                        "as:client_id", context.ClientId ?? string.Empty
                    },
                    {
                        "userName", context.UserName
                    }
                });

            var ticket = new AuthenticationTicket(identity, props);
            context.Validated(ticket);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (var property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            string clientId;
            string clientSecret;
            Client client = null;

            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
                context.TryGetFormCredentials(out clientId, out clientSecret);

            if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret))
            {
                context.SetError("invalid_token", "Invalid token request.");
                return Task.FromResult<object>(null);
            }

            client = _clientRepo.GetById(clientId);
            if (client == null)
            {
                context.SetError("invalid_clientId", $"The client '{context.ClientId}' is not registered in the system.");
                return Task.FromResult<object>(null);
            }
            if (!client.Active)
            {
                context.SetError("invalid_clientId", "The client is not active.");
                return Task.FromResult<object>(null);
            }


            if (client.Secret != clientSecret)
            {
                context.SetError("invalid_clientSecret", "The client secret is not valid.");
                return Task.FromResult<object>(null);
            }

            context.Validated();
            return Task.FromResult<object>(null);

        }

        public override Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            if (string.IsNullOrEmpty(context.ClientId))
            {
                context.SetError("invalid_grant", "Invalid token requrst.");
                return Task.FromResult<object>(null);
            }
            var originalClient = context.Ticket.Properties.Dictionary["as:client_id"];
            var currentClient = context.ClientId;

            if (originalClient != currentClient)
            {
                context.SetError("invalid_clientId", "Refresh token is issued to a different client.");
                return Task.FromResult<object>(null);
            }

            // Change auth ticket for refresh token requests
            var newIdentity = new ClaimsIdentity(context.Ticket.Identity);

            var newClaim = newIdentity.Claims.FirstOrDefault(c => c.Type == "newClaim");
            if (newClaim != null)
            {
                newIdentity.RemoveClaim(newClaim);
            }
            newIdentity.AddClaim(new Claim("newClaim", "newValue"));

            var newTicket = new AuthenticationTicket(newIdentity, context.Ticket.Properties);
            context.Validated(newTicket);

            return Task.FromResult<object>(null);

        }
    }
}