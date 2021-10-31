import { Component, OnInit } from '@angular/core';
import { forkJoin, take, takeUntil } from 'rxjs';
import { ISearchResultItem, SearchService } from '../../core/services/search.service';
import { BaseComponent } from '../../core/base/base.component';
import { WeatherService } from '../../core/services/weather.service';
import { IWeather } from '../../core/interfaces/weather.interface';
import { TableColumnNames } from '../../core/interfaces/table-column-names.enum';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent extends BaseComponent implements OnInit {

  public TableColumnNames: typeof TableColumnNames = TableColumnNames;

  /**
   * A combination of the retrieved stack over flow questions and retrieved local
   * weather data. It's combined to display alternating table rows more easier.
   */
  public combinedDataSource: { stackOverFlow: ISearchResultItem, weather: IWeather }[] = [];

  public columns: TableColumnNames[] = [
    TableColumnNames.TITLE,
    TableColumnNames.VIEW_COUNT
  ]

  private readonly NUM_OF_SEARCH_RESULTS: number = 5;

  constructor(private _searchService: SearchService,
              private _weatherService: WeatherService) {
    super();
  }

  /**
   * Fetches the top 5 questions from the {@link SearchService} and 5 random wheather data from
   * the {@link WeatherService}. After both results were retrieved they are combined into {@link combinedDataSource}.
   */
  public ngOnInit(): void {
    forkJoin([
      this._searchService
        .search('Weather', this.NUM_OF_SEARCH_RESULTS)
        .pipe(take(1), takeUntil(this.endSubsctiptions$)),
      this._weatherService.retrieveRandomWeatherData(this.NUM_OF_SEARCH_RESULTS)
        .pipe(take(1), takeUntil(this.endSubsctiptions$))
    ]).subscribe(([searchResults, weatherResults]: [ISearchResultItem[], IWeather[]]) => {
      for(let i = 0; i < this.NUM_OF_SEARCH_RESULTS; i++) {
        this.combinedDataSource.push({ stackOverFlow: searchResults[i], weather: weatherResults[i]});
      }
    })
  }


  /**
   * Opens the given {@param link} in a new browser tab.
   *
   * @param link
   */
  public openLink(link: string): void {
    window.open(link, "_blank");
  }

  /**
   * Builds a well readable information text from the given {@param data}, which is then shown in the table row.
   *
   * @param data
   */
  public buildWeatherInformation(data: IWeather): string {
    return `Am ${data.datum} um ${data.zeit} Uhr hatte es ${data.tempA} °C. Es hat ${data.regen} l/m2 geregnet, die Windgeschwindigkeit war ${data.wind} km/h und der Luftdruck betrug ${data.luftdruck} Pa. `
  }
}
