import { Injectable } from '@angular/core';
import { IQuestion } from '../interfaces/survey.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  createQuestion(question: IQuestion): void {
    var allQuestions: IQuestion[] = JSON.parse(
      localStorage.getItem('questions')!
    );
    if (allQuestions) {
      allQuestions.push(question);
      localStorage.setItem('questions', JSON.stringify(allQuestions));
    } else {
      localStorage.setItem('questions', JSON.stringify([question]));
    }
  }

  getAllQuestions(): IQuestion[] {
    return JSON.parse(localStorage.getItem('questions')!);
  }

  getAnsweredQuestions(): IQuestion[] {
    return JSON.parse(localStorage.getItem('answeredQuestions')!);
  }
}
