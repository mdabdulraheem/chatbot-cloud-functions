const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const serviceAccount = require('./covid-info-chatbot-rmgmxb-firebase-adminsdk-zwvzi-6012c50cb3.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://covid-info-chatbot-rmgmxb.firebaseio.com"
});

const dialogflow = require('@google-cloud/dialogflow');


exports.dialogflowGateway = functions.https.onRequest( (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');


  // res.set('Access-Control-Allow-Credentials', 'true');
    cors(req, res, async () => {
        console.log("Req",req.body, typeof(req.body));
        const { sessionId, text } = req.body;

        console.log("sess text",sessionId, text);
        queryInput =  {
          "text": {
            "text": text,
            "languageCode": "en-US"
          }
        };
        const sessionClient = new dialogflow.SessionsClient({ credentials: serviceAccount  });
        console.log("Before sessionPath");
        const session = sessionClient.projectAgentSessionPath("covid-info-chatbot-rmgmxb", sessionId);
        console.log("After sessionPath");
        
        const responses = await sessionClient.detectIntent({ session, queryInput });
        console.log("responses", responses[0].queryResult.fulfillmentText);
        const result = responses[0].queryResult;
        res.status(200).send(result);

    })
});


const { WebhookClient } = require('dialogflow-fulfillment');

exports.dialogflowWebhook = functions.https.onRequest(async (request, response) => {
    const agent = new WebhookClient({ request, response });

    const result = request.body.queryResult;


    async function userOnboardingHandler(agent) {

     // Do backend stuff here
     const db = admin.firestore();
     const profile = db.collection('users').doc('jeffd23');

     const { name, color } = result.parameters;

      await profile.set({ name, color })
      agent.add(`Welcome aboard my friend!`);
    }


    let intentMap = new Map();
    intentMap.set('UserOnboarding', userOnboardingHandler);
    agent.handleRequest(intentMap);
});
