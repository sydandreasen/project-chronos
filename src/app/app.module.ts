import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlannerWrapperComponent } from './planner-wrapper/planner-wrapper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';
import { MonthlyViewComponent } from './monthly-view/monthly-view.component';
import { DailyViewComponent } from './daily-view/daily-view.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes = [
  // TODO implement these routes as components get developed
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // FIXME add logic around auth state
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'plan', component: PlannerWrapperComponent },
  { path: '**', component: NotFoundComponent },
];

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
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
