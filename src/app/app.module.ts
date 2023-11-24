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
import { QuestionnaireEffects } from './store/effects/questionnaire.effects';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CreateQuestionnaireComponent } from './components/create-questionnaire/create-questionnaire.component';
import { ManagementPageComponent } from './components/management-page/management-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QuestionnaireListComponent } from './components/questionnaire-list/questionnaire-list.component';
import { questionnaireReducers } from './store/reducers/questionnaire.reducers';
import { CardElement } from './components/questionnaire-list/card-element/card-element.component';
import { DialogBoxComponent } from './components/management-page/dialog-box/dialog-box.component';
import { SortByCreationDatePipe } from './shared/pipes/sort-by-creation-date.pipe';
import { SortByAnswerDatePipe } from './shared/pipes/sort-by-answer-date.pipe';
@NgModule({
  declarations: [
    AppComponent,
    CreateQuestionnaireComponent,
    ManagementPageComponent,
    QuestionnaireListComponent,
    NavbarComponent,
    CardElement,
    DialogBoxComponent,
    SortByCreationDatePipe,
    SortByAnswerDatePipe,
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
    StoreModule.forRoot({ questionnaireData: questionnaireReducers }),
    EffectsModule.forRoot([QuestionnaireEffects]),
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
