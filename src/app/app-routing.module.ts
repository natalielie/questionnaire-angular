import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateQuestionnaireComponent } from './components/create-questionnaire/create-questionnaire.component';
import { ManagementPageComponent } from './components/management-page/management-page.component';
import { QuestionnaireListComponent } from './components/questionnaire-list/questionnaire-list.component';
import {
  createPath,
  editPath,
  managementPath,
  questionnaireListPath,
} from './shared/globals';

const routes: Routes = [
  { path: '', redirectTo: managementPath, pathMatch: 'full' },
  {
    path: createPath,
    component: CreateQuestionnaireComponent,
  },
  {
    path: managementPath,
    component: ManagementPageComponent,
  },
  {
    path: questionnaireListPath,
    component: QuestionnaireListComponent,
  },
  {
    path: editPath,
    component: CreateQuestionnaireComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
