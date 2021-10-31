import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "app/core/base/base.component";
import {
  ISearchResultItem,
  SearchService
} from "app/core/services/search.service";
import { StackOverflowColumnName } from "app/interfaces/stack-overflow-column-name.enum";
import { take, takeUntil } from "rxjs";

@Component({
  selector: "stack-overflow-questions",
  templateUrl: "./stack-overflow-questions.component.html",
  styleUrls: ["./stack-overflow-questions.component.scss"],
})
export class StackOverflowQuestionsComponent extends BaseComponent implements OnInit {
  @Input() searchCriteria: string;

  public StackOverflowColumnName: typeof StackOverflowColumnName = StackOverflowColumnName;

  public searchResults: ISearchResultItem[] = [];

  public columns: StackOverflowColumnName[] = [
    StackOverflowColumnName.TITLE,
    StackOverflowColumnName.VIEW_COUNT
  ]

  constructor(private _searchService: SearchService) {
    super();
  }

  public ngOnInit(): void {
    this._searchService
      .search(this.searchCriteria)
      .pipe(take(1), takeUntil(this.endSubsctiptions$))
      .subscribe({
        next: (result: ISearchResultItem[]) => {
          this.searchResults = result;
        }
      });
  }
}
