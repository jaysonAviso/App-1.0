using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
    }
}