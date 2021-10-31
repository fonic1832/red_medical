import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "../../core/base/base.component";
import {
  ISearchResultItem,
  SearchService
} from "../../core/services/search.service";
import { TableColumnNames } from "../../core/interfaces/table-column-names.enum";
import { take, takeUntil } from "rxjs";

@Component({
  selector: "stack-overflow-questions",
  templateUrl: "./stack-overflow-questions.component.html",
  styleUrls: ["./stack-overflow-questions.component.scss"],
})
export class StackOverflowQuestionsComponent extends BaseComponent implements OnInit {
  /** The topic of the top 10 questions. */
  @Input() searchCriteria: string;

  public TableColumnNames: typeof TableColumnNames = TableColumnNames;

  private readonly NUM_OF_SEARCH_RESULTS: number = 10;

  /** The table data source*/
  public searchResults: ISearchResultItem[] = [];

  public columns: TableColumnNames[] = [
    TableColumnNames.TITLE,
    TableColumnNames.VIEW_COUNT
  ]

  constructor(private _searchService: SearchService) {
    super();
  }

  /**
   * Fetches the top 10 questions from the {@link SearchService} at component init. The retrieved data
   * is then shown in the table.
   */
  public ngOnInit(): void {
    this._searchService
      .search(this.searchCriteria, this.NUM_OF_SEARCH_RESULTS)
      .pipe(take(1), takeUntil(this.endSubsctiptions$))
      .subscribe({
        next: (result: ISearchResultItem[]) => {
          this.searchResults = result;
        }
      });
  }

  /**
   * Opens the given {@param link} in a new browser tab.
   *
   * @param link
   */
  public openLink(link: string): void {
    window.open(link, "_blank");
  }
}
