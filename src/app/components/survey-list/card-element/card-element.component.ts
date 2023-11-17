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
  questionForm: FormGroup = this.formBuilder.group({
    answers: this.formBuilder.array([
      new FormControl<string>('', Validators.required),
    ]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.questionForm;
  }

  onSubmit(): void {
    let value = this.questionForm.getRawValue();
    window.location.reload();
  }
}
