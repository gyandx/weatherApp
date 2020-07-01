import { Component } from '@angular/core';
import { WeatherService } from './weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather App';
  allWeatherData = new Array(9);

  constructor(private weatherService:WeatherService){}

  ngOnInit(): void {
    // console.log(this.Weatherdata);
    var fullArray = [];
    for(let i = 0; i < this.allWeatherData.length; i++){
      var arr = {
        sunsetTime : "",
        isDay : "",
        temp_celcius : "",
        temp_min : "",
        humidity : "",
        clouds : "",
        rain : "",
        temp_feels_like : "",
        errorMessage : "",
        showCityForm : false
      };
      fullArray.push(arr);
    }
    this.allWeatherData = fullArray;
  }

  getWeatherDataDetails(cityName, position){
    this.weatherService.getWeatherData(cityName).subscribe(
      (response)=>{
        this.setWeatherData(response, position);
      },
      (error)=>{
        this.allWeatherData[position].errorMessage = error.error.message.toUpperCase();
        this.allWeatherData[position].showCityForm = true;
      }
    );
  }
  setWeatherData(data, position){
    this.allWeatherData[position] = data;
    console.log(this.allWeatherData[position]);
    let sunsetTime = new Date(this.allWeatherData[position].sys.sunset * 1000);
    this.allWeatherData[position].sunsetTime = sunsetTime.toLocaleDateString();
    let currentDate = new Date();
    this.allWeatherData[position].isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.allWeatherData[position].temp_celcius = (this.allWeatherData[position].main.temp);
    this.allWeatherData[position].temp_min = (this.allWeatherData[position].main.temp_min);
    this.allWeatherData[position].temp_max = (this.allWeatherData[position].main.temp_max);
    this.allWeatherData[position].humidity = (this.allWeatherData[position].main.humidity);
    this.allWeatherData[position].clouds = (this.allWeatherData[position].clouds);
    this.allWeatherData[position].rain = (this.allWeatherData[position].rain);
    this.allWeatherData[position].temp_feels_like = (this.allWeatherData[position].main.temp_feels_like);
    this.allWeatherData[position].errorMessage = "";
  }

  open(position){
    for(let i = 0; i < this.allWeatherData.length; i++){
      this.allWeatherData[i].showCityForm = false;
    }
    this.allWeatherData[position].showCityForm = true;
    this.allWeatherData[position].name = "";
  }

  onSubmit(cityName, position){
    this.getWeatherDataDetails(cityName, position);
    this.allWeatherData[position].showCityForm = false;
  }

  hide(position){
    this.allWeatherData[position].name = "";
  }
}
