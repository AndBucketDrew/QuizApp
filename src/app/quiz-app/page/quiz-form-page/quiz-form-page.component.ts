import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Option } from '../../models/question.model';

@Component({
  selector: 'app-quiz-form-page',
  templateUrl: './quiz-form-page.component.html',
  styleUrls: ['./quiz-form-page.component.scss']
})
export class QuizFormPageComponent implements OnInit {
  questionForm: FormGroup;
  questionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.questionForm = this.fb.group({
      questionText: [''],
      options: this.fb.array([]),
      correctAnswers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.questionId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    
    if (this.questionId !== null) {
      // Fetch the question asynchronously using subscribe
      this.quizService.getQuestion(this.questionId).subscribe(question => {
        if (question) {
          this.questionForm.patchValue({
            questionText: question.questionText
          });
          question.options.forEach((option: Option)=> this.addOption(option));
        }
      });
    }
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  addOption(option: Option = {text: '', isCorrect: false}) {
    this.options.push(this.fb.group({
      text: [option.text],
      isCorrect: [option.isCorrect]
    }));
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  saveQuestion() {
    if (this.questionId !== null) {
      this.quizService.updateQuestion(this.questionId, this.questionForm.value);
    } else {
      this.quizService.addQuestion(this.questionForm.value);
    }
    this.router.navigate(['/quiz-crud']);
  }
}
