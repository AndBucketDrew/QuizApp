import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCrudPageComponent } from './quiz-crud-page.component';

describe('QuizCrudPageComponent', () => {
  let component: QuizCrudPageComponent;
  let fixture: ComponentFixture<QuizCrudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizCrudPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizCrudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
