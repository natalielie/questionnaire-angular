import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { IAnswer, IQuestion } from 'src/app/interfaces/survey.interface';
import { AppState } from 'src/app/store/reducers/survey.reducers';

import * as SurveyActions from '../../../store/actions/survey.actions';
import {
  FormGroupDirective,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'card-element',
  templateUrl: 'card-element.component.html',
  styleUrls: ['card-element.component.scss'],
})
export class CardElement implements OnInit {
  @Input() question!: IQuestion;

  formReference?: FormGroupDirective;
  questionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      answers: this.formBuilder.array([new FormControl<string>('')]),
    });
  }

  // getAnswerOptions(question: IQuestion): IAnswer{
  //   if(question.type === '2'){
  //     throw new TypeError
  //   }
  //   this.store.dispatch(SurveyActions.getAnswers());

  // }

  onSubmit(): void {
    window.location.reload();
  }
}
