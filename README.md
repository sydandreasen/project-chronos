# ProjectChronos

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy
First, build (above).
Then, run 'firebase deploy'.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# What it's About

Project Chronos’ goal is the creation of a customizable calendar application. This application will come with both templates that users can utilize and features to allow users to customize their calendar in whatever way they want. More than just a calendar, project chronos will serve as a planner, allowing users to save information on days of the calendar.

Use the provided buttons to navigate between login/signup, and then actively login/signup to get to the main planning page. On this page, use the top left three buttons to navigate through monthly/weekly/daily views. Use the top right options button to log out. Use the left and right arrows to navigation months/weeklys/days (depending on current view).

# Release Notes: Milestone 1 Functionality

By milstone 1, we successfully complete our goals of having mockups created, the initial website completed, the login and signup front-end UI's completed (auth implementation to follow). We also have created the front-ends for monthly, weekly, and daily views, and we believe to have worked all kinks out of the date generation and navigation between them. We have also managed to host an early version of our application via Firebase at https://project-chronos-planner.firebaseapp.com/. You'll also notice that we have functional routing with different url endpoints between our login/signup/plan pages. Additionally, if you put in nonsense path, you will get a 404 page.

One item we mentioned in our milestone 1 goals was to also route to a page for custom templates. However, we have not yet planned the implementation of that individual page and therefore left the routing out. Though the framework for the routing has clearly been laid and would be simple to implement later when that page is created.

