import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCarouselModule } from 'ng-mat-carousel';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { environment } from 'src/environments/environment';
import { AuthGuard } from './services/auth.guard';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { PlannerWrapperComponent } from './components/routed-views/planner-wrapper/planner-wrapper.component';
import { WeeklyViewComponent } from './components/planning-views/weekly-view/weekly-view.component';
import { MonthlyViewComponent } from './components/planning-views/monthly-view/monthly-view.component';
import { DailyViewComponent } from './components/planning-views/daily-view/daily-view.component';
import { LoginComponent } from './components/routed-views/login/login.component';
import { SignupComponent } from './components/routed-views/signup/signup.component';
import { NotFoundComponent } from './components/routed-views/not-found/not-found.component';
import { DraggableComponent } from './components/plannables/draggable/draggable.component';
import { CustomizationFormComponent } from './components/customization-form/customization-form.component';
import { MetricsComponent } from './components/plannables/metrics/metrics.component';
import { TasksComponent } from './components/plannables/tasks/tasks.component';
import { NotesComponent } from './components/plannables/notes/notes.component';

/**
 * routes to show certain components based on URL
 */
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'plan',
    component: PlannerWrapperComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

/**
 * declare all necessary components and modules to use in the app module.
 */
@NgModule({
  declarations: [
    AppComponent,
    PlannerWrapperComponent,
    WeeklyViewComponent,
    MonthlyViewComponent,
    DailyViewComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    DraggableComponent,
    CustomizationFormComponent,
    MetricsComponent,
    TasksComponent,
    NotesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatCarouselModule.forRoot(),
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [],
  entryComponents:[MatDialogModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
