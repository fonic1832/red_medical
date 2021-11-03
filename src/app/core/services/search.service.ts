import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ISearchResultItem {
  answer_count: number;
  closed_date?: number;
  closed_reason?: string;
  creation_date: number;
  is_answered: boolean;
  accepted_answer_id?: number;
  last_activity_date: number;
  last_edit_date?: number;
  link: string;
  score: number;
  tags: Array<string>;
  title: string;
  view_count: number;
  owner: IQuestionOwner;
  question_id: number;
  content_license?: string;
}

export interface IQuestionOwner {
  reputation?: number;
  user_id: number;
  user_type?: string;
  accept_rate?: number;
  profile_image?: string;
  display_name?: string;
  link?: string;
}

export interface IStackExchangeCommonResponseWrapper {
  backoff?: number;
  error_id?: number;
  error_message?: string;
  error_name?: string;
  has_more?: boolean;
  items: ISearchResultItem[];
  quota_max: number;
  quota_remaining: number;
  page?: number;
  page_size?: number;
  total?: number;
  type?: string;
}

@Injectable()
export class SearchService {

  private static readonly apiBaseUrl =
    'https://api.stackexchange.com/2.2/search';

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Fetches the top search results from the stack overflow api with the given {@param keyword}. The
   * {@param count} defines the number of returned {@link ISearchResultItem}s.
   * The retrieved {@link IStackExchangeCommonResponseWrapper} list is sorted by date. So if the {@param count}
   * is set to 10 the 10 newest stackoverflow questions regarding the topic {@param keyword} are returned by the api.
   *
   * @param keyword
   * @param count
   */
  public search(keyword: string, count: number): Observable<ISearchResultItem[]> {
    // Use this endpoint for testing purposes, because the stackExchange api has a limit of 300 per timeframe
    // const url: string = 'http://localhost:4200/assets/mocked-stack-overflow.json';
    const url: string = `${SearchService.apiBaseUrl}?pagesize=${count}&order=desc&sort=activity&site=stackoverflow&intitle=${keyword}`

    return this._httpClient.get<any>(url)
      .pipe(
        map((response: IStackExchangeCommonResponseWrapper) => {
          console.log('API USAGE: ' + response.quota_remaining + ' of ' + response.quota_max + ' requests available');
          return response.items.map((value: ISearchResultItem) => {
            value.title = this._decodeHtmlEntities(value.title);
            return value;
          });
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError(new Error(err));
        })
      );
  }

  /**
   * Helper function to decode html entitiy characters. e.g. &qout;
   *
   * @param str
   * @private
   */
  private _decodeHtmlEntities(str: string) {
    let textAreaElement: HTMLTextAreaElement = document.createElement("textarea");
    textAreaElement.innerHTML = str;
    return textAreaElement.value;
  }
}
