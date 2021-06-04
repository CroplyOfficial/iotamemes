# MERN Starter Code

this is MERN Stack starter code that I wrote in a day (Almost)

it has the following features

- Token based authorization (User is tokenized and the token is set to expire in 90 days)

- Proper Redux store has been setup

- Users, auth and protected routes have been setup

- basic UI has been setup

> Take it from here :) make it whatever you want the sky is the limit!!!

## Setup

1. Server

   - the server's node_mods are directly in the root so while in root run
     `$ npm i`
   - we need `concurrently` and `nodemon` as dev dependencies so install them also
   - rename the `.env_example` file to `.env` and populate it with actual data related to your setup.

2. Client

   - cd into the client `$ cd client/` and run `$ npm i`

3. Execution

   - cd into the root of the project and run `$ npm run dev` this command will invoke concurrently and both the client and server would start to run at the same time.
