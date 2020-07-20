# Chatbot Cloud Functions
This repository holds the cloud functions for [chatbot app](https://github.com/mdabdulraheem/chatbot-app).

# Instructions
* [Download the installer](https://nodejs.org/) for Node LTS.
* Install Firebase `npm install -g firebase-tools`.
* Clone this repository: `git clone https://github.com/mdabdulraheem/chatbot-cloud-functions.git`.
* Run `npm install` from the project root.
* cd into the functions directory.
* Generate a private key by following the instructions [here](https://firebase.google.com/docs/auth/web/custom-auth).
* Save the generated key into functions folder and change the serviceAccount file path in index.js to point to this file.
* Change the firebase project name in the index.js.
* Deploy the project using the command `firebase deploy --only functions --project="project-name-here"`.
