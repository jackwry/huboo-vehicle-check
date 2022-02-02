Huboo Vehicle Checker
=====================

This small project comprises of two small applications:
 - A React frontend for requesting and displaying vehicle MOT info.
 - A very small Express.js API which abstracts the API call to the external MOT check service from the browser.

Getting started
---------------

You will need the following:
 - Node.js (v16 recommended)
 - Optionally, Docker Engine (v19.03.0+ recommended)

The project has been configured to be served using Docker and Docker Compose.
To get started just run `docker compose up` at the root of the project.

To run the application outside of Docker, start both the React service (`./web`) and the Express.js API service (`./api`).
To start these services in development mode, use `npm start`.

Solution rationale
------------------

This solution could well have been consolidated into just the React (web) application.
However due to the way the DVLA Vehicle Check API is configured, it cannot be called from within a browser.
This is due to the pre-request OPTIONS call that modern browsers make in certain instances.
The OPTIONS method on the MOT Vehicle Check API requires authentication whereas normally this is normally public.

Hence the introduction of the small Express API (`./api`).
By calling the external endpoint from with a backend service, this issue is circumvented.

Future work
-----------

The solution as-is runs well in a development environment however it is not suited for production environments.
The following work should be considered in any future development:
 - Make URLs configurable in both web and api projects.
 - Improve Docker builds, especially in web project, to ensure smallest possible image and to use production builds.
 - Update web and api specific READMEs.
 - Add unit tests for web and API.
 - Refactor `RegInput.tsx` in web service as this has several aspects that can be moved out to simplify component.
