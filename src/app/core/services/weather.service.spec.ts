import { WeatherService } from '../services/weather.service';
import { of } from 'rxjs';
import { IWeather } from '../../interfaces/weather.interface';

describe('WeatherService', () => {
  let sut: WeatherService;

  beforeEach(() => {
    sut = new WeatherService({ get() {} } as any)
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  describe('retrieveRandomWeatherData', () => {
    it('should get json data and transform to weatherData', () => {
      const json: any = {
        "Datum": "22.02.2016",
        "Zeit": "08:30",
        "Temp. A.": 9.8,
        "Temp. 3": -39,
        "Feuchte A.": 74,
        "Luftdruck": 964,
        "Regen": 0,
        "Wind": 44.2,
        "Richtung": 285,
        "Helligkeit": 20200
      };

      const expectedWeatherData: IWeather = {
        datum: '22.02.2016',
        zeit: '08:30',
        tempA: 9.8,
        temp3: -39,
        feuchteA: 74,
        luftdruck: 964,
        regen: 0,
        wind: 44.2,
        richtung: 285,
        helligkeit: 20200
      };

      jest.spyOn((sut as any)._httpClient, 'get').mockReturnValueOnce(of([json]));

      sut.retrieveRandomWeatherData(1)
        .subscribe((transformedData: IWeather[]) => {
          expect(transformedData).toEqual([expectedWeatherData]);
        });
    });
  });
});
