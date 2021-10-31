import { Component, OnInit } from '@angular/core';
import { take, takeUntil } from 'rxjs';
import { ISearchResultItem, SearchService } from 'app/core/services/search.service';
import { BaseComponent } from 'app/core/base/base.component';
import { WeatherService } from 'app/core/services/weather.service';
import { IWeather } from 'app/interfaces/weather.interface';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent extends BaseComponent implements OnInit {

  public stackOverflowData: ISearchResultItem[] = [];

  public weatherData: IWeather[] = [];

  private readonly NUM_OF_SEARCH_RESULTS: number = 5;

  constructor(private _searchService: SearchService,
              private _weatherService: WeatherService) {
    super();
  }

  public ngOnInit(): void {
    this._searchService
      .search('Weather', this.NUM_OF_SEARCH_RESULTS)
      .pipe(take(1), takeUntil(this.endSubsctiptions$))
      .subscribe({
        next: (result: ISearchResultItem[]) => this.stackOverflowData = result
      });

    this._weatherService.retrieveWeatherData(this.NUM_OF_SEARCH_RESULTS)
      .pipe(take(1), takeUntil(this.endSubsctiptions$))
      .subscribe({
        next: (result: IWeather[]) => this.weatherData = result
      })
  }
}
