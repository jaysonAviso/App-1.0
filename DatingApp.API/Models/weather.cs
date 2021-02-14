namespace DatingApp.API.Models
{
    public class weather
    {
        public int id { get; set; }
        public string date { get; set; }
        public int temperatureC { get; set; }
        public int temperatureF { get; set; }
        public string summary { get; set; }
    }
}