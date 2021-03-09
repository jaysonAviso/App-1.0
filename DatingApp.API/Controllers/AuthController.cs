using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        public AuthController(IAuthRepository repo, IConfiguration config, ITokenService tokenService, IMapper mapper)
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _config = config;
            _repo = repo;

        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            userForRegisterDto.KnownAS = userForRegisterDto.KnownAS.ToLower();

            var user = _mapper.Map<User>(userForRegisterDto);

            if (await _repo.isExists(userForRegisterDto.Username))
                return BadRequest("Username Already Exist.");

            var createdUser = await _repo.Register(user, userForRegisterDto.Password);

            var UserDetailed = _mapper.Map<UserForDetailedDto>(createdUser);

            return new UserDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAS
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] UserForLoginDto userForLoginDto)
        {
            var user = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (user == null)
                return Unauthorized();

            return new UserDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAS
            };

        }
    }
}