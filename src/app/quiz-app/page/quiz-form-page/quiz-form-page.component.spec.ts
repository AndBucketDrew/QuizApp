import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFormPageComponent } from './quiz-form-page.component';

describe('QuizFormPageComponent', () => {
  let component: QuizFormPageComponent;
  let fixture: ComponentFixture<QuizFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
