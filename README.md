# Dancoto Friends Visualizer

## Assumptions taken with design

- Input form will allow you to enter multiple friends one at a time
- The Friend field `friends` is numeric
- Since there are 3 fields to compare, I created a scatter plot to be able to compare 2 values together
  - These can be changed by a settings section above the chart
- There would be some API saving, so simulated calls are done via timeout observables
- uuid is generated on UI to help mock recieving a unique ID from API
- Friend type is stored in the `types` project to simulate a shared type with other projects
- I have set the friends reducers as feature reducers to simulate modularity
- Though no API and no errors are thrown, there is a notifications system to handle simulated errors (see core/notifications). We can force these by adjusting the return values of friends/friends.service.ts to throw errors

## Project information

The workspace was created with NX. The main application is under the `friends` app.

### Overall Structure

Two reducers (in the feature `friends`) handle the main state of the app

- friendsReducer is a single array state of `Friend` objects that holds all of the added friends
  - Since these will be simulating API saves, initial actions are dispatched, the `FriendsEffects` calls the `FriendsService` and the reducer listens to the success actions
- chartsReducer is an object with `xAxis` and `yAxis` to handle changes to the charts axis
  - Since no API interaction here, the reducer responds to the dispatch actions to update the `xAxis` and `yAxis`

Errors can be handled by the NotificationsService + NotificationsEffects by dispatching the `showNotification({message})` action

### Features

- Form to add Friends
  - Validators on valid name and numerics for Friends, Age, and Weight
- Once at least one friend is added, the chart is populated
  - Comparison axis can be changed from the settings on top of the chart
  - Manage Friends button opens a modal with a table listing all friends and allows you to remove friends
    - This is done via the store, so it updates the charts as well
    - If no friends remain in the store, the chart is removed
  - Chart handles redraws in a few ways
    - On first init, wait for the afterViewInit to render the initial chart so it can correctly get its container's dimensions for scaling
    - On resize, only redraw the existing elements to fit the new dimensions
      - There is a resize observable with a debounce listening to window resize events that trigger this
    - On data change, update the values and merge the elements to redraw
    - On axis change, the chart is removed and redrawn for new data set and axis

## Getting started

Run `npm install` to install all dependencies before running

## Running Tests

`ng test` or `npm run test`

## Running the project

`ng serve` or `npm run start`

Application will open at http://localhost:4200
