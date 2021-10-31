import { StackOverflowQuestionsComponent } from './stack-overflow-questions.component';
import SpyInstance = jest.SpyInstance;
import { of, throwError } from 'rxjs';

describe('StackOverflowQuestionsComponent', () => {
  let cut: StackOverflowQuestionsComponent;

  beforeEach(() => {
    cut = new StackOverflowQuestionsComponent({ search() {} } as any);
  });

  it('should create', () => {
    expect(cut).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init search results correctly', () => {
      const searchResults: any[] = [{ title: 'title', view_count: 100, link: 'link' }];
      const spy: SpyInstance = jest.spyOn((cut as any)._searchService, 'search');
      spy.mockReturnValueOnce(of(searchResults));
      cut.searchCriteria = 'Angular2';

      cut.ngOnInit();

      expect(cut.searchResults).toEqual(searchResults);
      expect(spy).toHaveBeenCalled();
    });

    it('should init search results correctly', () => {
      jest.spyOn((cut as any)._searchService, 'search').mockReturnValueOnce(throwError(new Error()));
      cut.searchCriteria = 'Angular2';

      cut.ngOnInit();

      expect(cut.searchResults).toEqual([]);
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
});
