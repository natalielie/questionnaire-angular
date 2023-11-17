import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { ManagementPageComponent } from './components/management-page/management-page.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { createPath, managementPath, surveyListPath } from './shared/globals';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
