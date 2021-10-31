import {Injectable} from "@angular/core";
import { catchError, map, Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ISearchResultItem  {
    answer_count: number;
    closed_date: number;
    closed_reason: string;
    creation_date: number;
    is_answered: boolean;
    last_activity_date: number;
    link: string;
    score: number;
    tags: Array<string>;
    title: string;
    view_count: number;
}

export interface StackExchangeCommonResponseWrapper {
  backoff: number;
  error_id: number;
  error_message: string;
  error_name: string;
  has_more: boolean;
  items: any[];
  quota_max: number;
  quota_remaining: number;
  page?: number;
  page_size?: number;
  total?: number;
  type?: string;
}

@Injectable()
export class SearchService {

    private static readonly apiUrl =
        "https://api.stackexchange.com/2.2/search?pagesize=20&order=desc&sort=activity&site=stackoverflow&intitle=";

    constructor(private _httpClient: HttpClient) { }

    search(keyword: string): Observable<StackExchangeCommonResponseWrapper> {
      return this._httpClient.get<StackExchangeCommonResponseWrapper>(SearchService.apiUrl + keyword)
        .pipe(
          map((response: StackExchangeCommonResponseWrapper) => {
            console.log("API USAGE: " + response.quota_remaining + " of " + response.quota_max + " requests available" );
            return response;
          }),
          catchError((err: Response) => err.json())
        );
    }
}
