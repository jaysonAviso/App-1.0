import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Weather',
  templateUrl: './Weather.component.html',
  styleUrls: ['./Weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherValue: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getWeather()
  }

  getWeather(){
    this.http.get('http://localhost:5000/api/weatherforecast').subscribe(response => {
      this.weatherValue = response;
    }, error => console.error(error))
  }

}
