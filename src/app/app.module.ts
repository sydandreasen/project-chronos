import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlannerWrapperComponent } from './planner-wrapper/planner-wrapper.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
