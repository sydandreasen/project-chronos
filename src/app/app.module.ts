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

const routes = [
  // TODO implement these routes as components get developed
  { path: '', redirectTo: 'plan', pathMatch: 'full' }, // FIXME probably want to later redirect to login
  // {path: 'login', component: LoginComponent},
  // {path: 'signup', component: SignupComponent},
  { path: 'plan', component: PlannerWrapperComponent },
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [AppComponent, PlannerWrapperComponent],
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
