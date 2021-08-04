# ProjectChronos

# Table of Contents

1. [Tech Stack](#tech-stack)
2. [What it's About](#what-its-about)
3. [Angular Command Line Help](#angular-command-line-help)
4. [Release Notes: Milestone 1 Functionality](#release-notes-milestone-1-functionality)
5. [Release Notes: Milestone 2 Functionality](#release-notes-milestone-2-functionality)
6. [Release Notes: Milestone 3 Functionality](#release-notes-milestone-3-functionality)
7. [Release Notes: Milestone 4 Functionality](#release-notes-milestone-4-functionality)

# Tech Stack

- Angular
- TypeScript
- HTML5
- CSS (via SCSS)
- Firebase Hosting
- Firebase Authentication
- Firebase Realtime DB (NoSQL)

# What it's About

Project Chronos’ goal is the creation of a customizable calendar application. This application will come with both templates that users can utilize and features to allow users to customize their calendar in whatever way they want. More than just a calendar, project chronos will serve as a planner, allowing users to save information on days of the calendar.

Use the provided buttons to navigate between login/signup, and then actively login/signup to get to the main planning page. On this page, use the top left three buttons to navigate through monthly/weekly/daily views. Use the top right options button to log out. Use the left and right arrows to navigation months/weeklys/days (depending on current view).

# Angular Command Line Help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

#### Development server

Run `ng serve --open` for a dev server.

#### Code scaffolding

Run `ng g c component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

#### Deploy

First, build (above).
Then, run 'firebase deploy'.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Release Notes: Milestone 1 Functionality

By milstone 1, we successfully complete our goals of having mockups created, the initial website completed, the login and signup front-end UI's completed (auth implementation to follow). We also have created the front-ends for monthly, weekly, and daily views, and we believe to have worked all kinks out of the date generation and navigation between them. We have also managed to host an early version of our application via Firebase at https://project-chronos-planner.firebaseapp.com/. You'll also notice that we have functional routing with different url endpoints between our login/signup/plan pages. Additionally, if you put in nonsense path, you will get a 404 page.

One item we mentioned in our milestone 1 goals was to also route to a page for custom templates. However, we have not yet planned the implementation of that individual page and therefore left the routing out. Though the framework for the routing has clearly been laid and would be simple to implement later when that page is created.

# Release Notes: Milestone 2 Functionality

Basic customization tools have now been added. On the daily view, tasks and metrics can be drag-and-dropped into the days, with their text boxes being editable. Some basic color, font size, and font family customizations are also possible. This is all front-end at this point with no persistency of customizations because the backend part has not been created.

Authentication backend now exists for signup and login, as well as guarding the /plan URL endpoint so that un-authenticated users cannot access it.

# Release Notes: Milestone 3 Functionality

New functionality is largely related to back-end edits. Now, a user is created upon signup. The user is also read upon login. When a user is authenticated, there is a check for whether basic settings exist for them in the DB. If they for some reason do not exist, default values are populated into the DB for that user. The user settings from the DB are used to populate the UI and are editable in the UI and persistent via changes to the DB. Metrics and tasks can be created by dragging and dropping them into a given day. They can be edited, with that information all saved to the DB. They can also be reordered within the day or removed from the day with that all reflectedin the DB. Metricsa and tasks are of course also read in to populate the UI. There is also an option to use the current day in daily view as a template and give that many empty tasks and metrics to all other days in the week. There is also an option to use a week as a template and export that to a png file.

# Release Notes: Milestone 4 Functionality

For Milestone 4. New functionality is limited. Most of the code worked focused on testing and refactoring code to have cleaner, more re-used as opposed to repeated, code.

New functionality includes the ability for a user to set their default planning view (which one of weekly, daily, or monthly will show up automatically). New functionality (though a correction on what would have probably been an excpected behavior in Milestone 3, and therefore a bug fix) to allow the checkbox on tasks to be edited in the monthly and weekly views and saving that information to the database was implemented, instead of only being able to have those edits being persistent after making them in the daily view.

One new piece of functionality is a new draggable/plannable note option. This is very similar to a task but does not include the checkbox so that a user can simply apply notes to their day. This feature is in addition to the task and metric options. All the CRUD operations work the same on the note as on the others.

A bug fix was implemented related to the ordering of the planned objects in the day where their index was not always being properly taken into account when creating the array for the day.

A model object was created for the various user default setting values. This was then referenced throughout the project so that if a default font family, font size, etc. is to be changed, it can be changed in just the model and be propagated throughout the project immediately. This model also allows a more dynamic setup of user settings; by using Object.getOwnPropertyNames, we can loop through all the settings a user is supposed to have, without having to know and specify what each of those are in the code.

Various functions in our Firebase Service were consolidated to have less code and reuse the common functionality. For example, this was done with the settings functions, where previously there were separate functions to edit the font color, size, and family in the database, when truly only one is necessary. Similarly, by generalizing a function for updating our plannable objects, multiple functions were able to be removed. This means that a single value may be rewritten at times into the DB even if it doesn't need to be. However, with the speed of the database connection, many less lines of code is favorable, and rewriting that single value is not an impactful consequence.

Further code cleaning was done by reorganizing the file structure in the project and extracting common styling out to a global file and imported in where needed.
