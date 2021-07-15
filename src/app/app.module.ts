import { NgModule } from '@angular/core';
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
import { PlannerWrapperComponent } from './components/planner-wrapper/planner-wrapper.component';
import { WeeklyViewComponent } from './components/weekly-view/weekly-view.component';
import { MonthlyViewComponent } from './components/monthly-view/monthly-view.component';
import { DailyViewComponent } from './components/daily-view/daily-view.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DraggableComponent } from './components/draggable/draggable.component';
import { FontDialogComponent } from './components/font-dialog/font-dialog.component';

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
    FontDialogComponent,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
