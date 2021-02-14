using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using DatingApp.API.Models;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly DataContext _context;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, DataContext context)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var weather = await _context.weathers.ToListAsync();

            return Ok(weather);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var weather = await _context.weathers.FirstOrDefaultAsync(x => x.id == id);

            if(weather == null)
                return BadRequest("invalid weather ID.");

            return Ok(weather);
        }

        [HttpPost("create")]
        public async Task<IActionResult> create(WeatherDto weatherDto)
        {
            var weather = new weather {
                date = weatherDto.Date,
                temperatureC = weatherDto.TemperatureC,
                temperatureF = weatherDto.TemperatureF,
                summary = weatherDto.Summary   
            };

            await _context.weathers.AddAsync(weather);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }
    }
}
