import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
import { PlannerWrapperComponent } from './planner-wrapper/planner-wrapper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';
import { MonthlyViewComponent } from './monthly-view/monthly-view.component';
import { DailyViewComponent } from './daily-view/daily-view.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatCarouselModule } from 'ng-mat-carousel';




/**
 * routes to show certain components based on URL
 */
const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // FIXME add logic around auth state
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'plan', component: PlannerWrapperComponent },
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
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule, // created by CLI - a more complex routing implementation
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatCarouselModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
