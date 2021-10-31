import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackOverflowQuestionsComponent } from './stack-overflow-questions.component';

describe('StackOverflowQuestionsComponent', () => {
  let component: StackOverflowQuestionsComponent;
  let fixture: ComponentFixture<StackOverflowQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackOverflowQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackOverflowQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
