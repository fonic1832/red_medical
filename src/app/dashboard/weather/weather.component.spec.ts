import { WeatherComponent } from './weather.component';
import { of, throwError } from 'rxjs';
import SpyInstance = jest.SpyInstance;

describe('WeatherComponent', () => {
  let cut: WeatherComponent;

  beforeEach(() => {
    cut = new WeatherComponent(
      { search() {} } as any,
      { retrieveRandomWeatherData() {} } as any
    );
  });

  it('should create', () => {
    expect(cut).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init combineDataSource object correctly', () => {
      const searchServiceResult: any = { title: 'title', view_count: 100, link: 'link' };
      const weatherServiceResult: any = { datum: '01.01.2001', zeit: '14:20', luftdruck: 964 };
      const expectedCombinedDataSource: any =[
        { stackOverFlow: searchServiceResult, weather: weatherServiceResult },
        { stackOverFlow: undefined, weather: undefined },
        { stackOverFlow: undefined, weather: undefined },
        { stackOverFlow: undefined, weather: undefined },
        { stackOverFlow: undefined, weather: undefined }
      ];

      const spySearchService: SpyInstance = jest.spyOn((cut as any)._searchService, 'search');
      spySearchService.mockReturnValueOnce(of([searchServiceResult]));

      const spyWeatherService: SpyInstance = jest.spyOn((cut as any)._weatherService, 'retrieveRandomWeatherData');
      spyWeatherService.mockReturnValueOnce(of([weatherServiceResult]));

      cut.ngOnInit();

      expect(cut.combinedDataSource).toEqual(expectedCombinedDataSource);
      expect(spySearchService).toHaveBeenCalled();
      expect(spyWeatherService).toHaveBeenCalled();
    });

    it('should have empty combined data source array if searchService fails', () => {
      const weatherServiceResult: any = { datum: '01.01.2001', zeit: '14:20', luftdruck: 964 };

      jest.spyOn((cut as any)._searchService, 'search').mockReturnValueOnce(throwError(new Error()));

      const spyWeatherService: SpyInstance = jest.spyOn((cut as any)._weatherService, 'retrieveRandomWeatherData');
      spyWeatherService.mockReturnValueOnce(of([weatherServiceResult]));

      cut.ngOnInit();

      expect(cut.combinedDataSource).toEqual([]);
      expect(spyWeatherService).toHaveBeenCalled();
    });

    it('should have empty combined data source array if weatherService fails', () => {
      const searchServiceResult: any = { title: 'title', view_count: 100, link: 'link' };

      jest.spyOn((cut as any)._weatherService, 'retrieveRandomWeatherData')
        .mockReturnValueOnce(throwError(new Error()));

      const spySearchService: SpyInstance = jest.spyOn((cut as any)._searchService, 'search');
      spySearchService.mockReturnValueOnce(of([searchServiceResult]));

      cut.ngOnInit();

      expect(cut.combinedDataSource).toEqual([]);
      expect(spySearchService).toHaveBeenCalled();
    });
  });

  describe('openLink', () => {
    it('should open the link in a new tab', () => {
      const spy: SpyInstance = jest.spyOn(window, 'open').mockImplementation();

      cut.openLink('https://www.google.com');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('https://www.google.com', '_blank');
    });
  });

  describe('buildWeatherInformation', () => {
    it('should build the correct string', () => {
      const weather: any = {
        datum: '01.01.2001',
        zeit: '14:20',
        tempA: 23,
        regen: 0.8,
        wind: 12,
        luftdruck: 964
      };

      expect(cut.buildWeatherInformation(weather))
        .toEqual("Am 01.01.2001 um 14:20 Uhr hatte es 23 °C. Es hat 0.8 l/m2 geregnet, die " +
          "Windgeschwindigkeit war 12 km/h und der Luftdruck betrug 964 Pa. ");
    });
  });
});
