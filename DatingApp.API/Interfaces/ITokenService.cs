using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}