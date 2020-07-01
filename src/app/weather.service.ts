import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  api_url = 'https://api.openweathermap.org/data/2.5/weather?q';
  api_key = 'cf7ec5cbe780bbbe36c53c02c6ba1a19';
  units = 'metric';

  constructor(private http:HttpClient) { }
  getWeatherData(city:string):Observable<any>{
    return this.http.get<any>(this.api_url + "=" + city + "&appid=" + this.api_key + "&units=" + this.units).pipe(map(res=>res));
  }
}
