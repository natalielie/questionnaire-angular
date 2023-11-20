import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SurveyEffects } from './store/effects/survey.effects';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { ManagementPageComponent } from './components/management-page/management-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { AppState, surveyReducers } from './store/reducers/survey.reducers';
import { CardElement } from './components/survey-list/card-element/card-element.component';
import { DialogBoxComponent } from './components/management-page/dialog-box/dialog-box.component';

// const surveyReducerMap: ActionReducerMap<AppState> = {
//   surveyData: surveyReducers,
// };

@NgModule({
  declarations: [
    AppComponent,
    CreateSurveyComponent,
    ManagementPageComponent,
    SurveyListComponent,
    NavbarComponent,
    CardElement,
    DialogBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    //StoreModule.forRoot(surveyReducerMap),
    StoreModule.forRoot({ surveyData: surveyReducers }),
    EffectsModule.forRoot([SurveyEffects]),
    StoreDevtoolsModule.instrument({}),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'accent' },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
