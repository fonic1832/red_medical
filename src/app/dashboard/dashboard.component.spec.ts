import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let cut: DashboardComponent;


  beforeEach(() => {
    cut = new DashboardComponent();
  });

  it('should create', () => {
    expect(cut).toBeTruthy();
  });
});
