# charts-app

This is an application can be used for adding charts so that analytics are represented.. 
It's a simple app created using react, react-redux, react-thunk, and more packages.

## Instructions to use this repo:

To get started right away and check the application:

* install all project dependencies with `npm install` or `yarn add`
* start the server with `npm start` or `yarn start`

## Backend Server

I've used [`JSONPlaceholder`](https://jsonplaceholder.typicode.com/) to create my own placeholder api server which could be found in this repo [`charts-app-api-server`](https://github.com/Moon04/charts-app-api-server). 
## App Details

* User can view all charts in the Internal Dashboard page
* User can add new chart with two supported extensions (JSON & CSV)
* User must make sure to upload a file that looks like the provided files in [`testing_files`](https://github.com/Moon04/charts-app/tree/master/testing_files) directory 
* App has basic testing configuration

## Important Note
The backend API server has some limits: 
* Changes are faked and aren't persisted (just like JSONPlaceholder)
* Requests are cached (1 minute)
* Service may be down sometimes