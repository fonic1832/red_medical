import { of } from 'rxjs';
import { ISearchResultItem, SearchService } from '../services/search.service';

describe('SearchService', () => {
  let sut: SearchService;

  beforeEach(() => {
    sut = new SearchService({
      get() {
      }
    } as any);
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  describe('retrieveRandomWeatherData', () => {
    it('should get json data and transform to weatherData', () => {
      const json: any = {
        'tags': [
          'javascript',
          'angular',
          'rxjs'
        ],
        'owner': {
          'reputation': 8018,
          'user_id': 1691423,
          'user_type': 'registered',
          'accept_rate': 89,
          'profile_image': 'https://i.stack.imgur.com/YtJy0.jpg?s=256&g=1',
          'display_name': 'vlio20',
          'link': 'https://stackoverflow.com/users/1691423/vlio20'
        },
        'is_answered': true,
        'view_count': 1184,
        'answer_count': 1,
        'score': 0,
        'last_activity_date': 1635586699,
        'creation_date': 1457206411,
        'last_edit_date': 1635586699,
        'question_id': 35818851,
        'content_license': 'CC BY-SA 4.0',
        'link': 'https://stackoverflow.com/questions/35818851/angular2-observables-best-practice',
        'title': 'Angular2 Observables best practice'
      };

      const expectedWeatherData: ISearchResultItem = {
        tags: [
          'javascript',
          'angular',
          'rxjs'
        ],
        owner: {
          reputation: 8018,
          user_id: 1691423,
          user_type: 'registered',
          accept_rate: 89,
          profile_image: 'https://i.stack.imgur.com/YtJy0.jpg?s=256&g=1',
          display_name: 'vlio20',
          link: 'https://stackoverflow.com/users/1691423/vlio20'
        },
        is_answered: true,
        view_count: 1184,
        answer_count: 1,
        score: 0,
        last_activity_date: 1635586699,
        creation_date: 1457206411,
        last_edit_date: 1635586699,
        question_id: 35818851,
        content_license: 'CC BY-SA 4.0',
        link: 'https://stackoverflow.com/questions/35818851/angular2-observables-best-practice',
        title: 'Angular2 Observables best practice'
      };

      jest.spyOn((sut as any)._httpClient, 'get').mockReturnValueOnce(of([json]));

      sut.search('Angular2', 1)
        .subscribe((transformedData: ISearchResultItem[]) => {
          expect(transformedData).toEqual([expectedWeatherData]);
        });
    });
  });
});
