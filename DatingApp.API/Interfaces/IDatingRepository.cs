using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<PagedList<UserDetailedDto>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<User> GetByUsername(string username);
        Task<User> GetUserById(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhoto(int id);
    }
}