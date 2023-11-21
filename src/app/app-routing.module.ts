import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSurveyComponent } from './components/create-questionnaire/create-questionnaire.component';
import { ManagementPageComponent } from './components/management-page/management-page.component';
import { SurveyListComponent } from './components/questionnaire-list/questionnaire-list.component';
import {
  createPath,
  editPath,
  managementPath,
  surveyListPath,
} from './shared/globals';

const routes: Routes = [
  { path: '', redirectTo: managementPath, pathMatch: 'full' },
  {
    path: createPath,
    component: CreateSurveyComponent,
  },
  {
    path: managementPath,
    component: ManagementPageComponent,
  },
  {
    path: surveyListPath,
    component: SurveyListComponent,
  },
  {
    path: editPath,
    component: CreateSurveyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
