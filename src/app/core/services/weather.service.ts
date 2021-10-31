import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IWeather } from 'app/interfaces/weather.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {

  constructor(private _httpClient: HttpClient) { }

  public retrieveWeatherData(count: number): Observable<IWeather[]> {
    return this._httpClient.get('http://localhost:4200/assets/weatherdata.json')
      .pipe(
        map((jsonData: any[]) => {
          let weatherData: IWeather[] = [];
          const random: number = Math.floor(Math.random() * jsonData.length)

          while(weatherData.length < count) {
            const json: any = jsonData[random];
            const weather: IWeather = {
              datum: json["Datum"] as string,
              zeit: json["Zeit"] as string,
              feuchteA: json["Feuchte A."] as number,
              helligkeit: json["Helligkeit"] as number,
              luftdruck: json["Luftdruck"] as number,
              regen: json["Regen"] as number,
              richtung: json["Richtung"] as number,
              temp3: json["Temp. 3"] as number,
              tempA: json["Temp. A."] as number,
              wind: json["Wind"] as number
            };
            weatherData.push(weather);
          }

          return weatherData;
        })
      )
  }
}
