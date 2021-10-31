import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let cut: AppComponent;

  beforeEach(() => {
    cut = new AppComponent();
  });

  it('should create the app', () => {
    expect(cut).toBeTruthy();
  });
});
