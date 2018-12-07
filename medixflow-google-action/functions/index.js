'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

const request = require('request');
const axios = require('axios')

const i18n = require('@sfeir/actions-on-google-i18n');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

i18n
  .configure({
    directory: `${__dirname}/src/locales`,
    defaultLocale: 'en-us',
  })
  .use(app);

app.intent('Pain Querry', (conv, {name}) => {
    console.log("Pain QUERRY");
    return new Promise (function( resolve, reject ){
        request.get(`https://medixflow.de/api/v1/patient/?query={"name":{"$regex":"^(${name})"}}`, function (error, response, body) {
        var patientId = JSON.parse(body)[0]._id;
        if(error) {
            reject(error)
        }
        request.get(`https://medixflow.de/api/v1/pain/?query={"patient":"${patientId}"}`, function (error, response, body) {
            if(error) {
                reject(error)
            }
            const data = JSON.parse(body);
            const numberOfPains = data.length
            const latestPainStrengh = data[numberOfPains-1].strength
            conv.ask(conv.__('PAINQUERRY', { numberOfPains: numberOfPains, latestPainStrengh: latestPainStrengh }));
            conv.close();
            resolve();
        });
    });
    });
});

app.intent('Schmerzdokumentation', function (conv, {painlevel, givenname}) {
    console.log(`PAINLEVEL: ${painlevel} and GIVENNAME: ${givenname}`);
        
    console.log("Pain DOCUMENTATION");
    return new Promise (function( resolve, reject ){
        request.get(`https://medixflow.de/api/v1/patient?query={"name":{"$regex":"^(${givenname})"}}`, function (error, response, body) {
            var patientId = JSON.parse(body)[0]._id;
            if(error) {
                reject(error)
            }
            axios.post('https://medixflow.de/api/v1/pain', {
                strength: painlevel,
                patient: patientId,
            })
            .catch(function (error) {
                console.log(error);
            });
            
            resolve();
            conv.ask(conv.__('PAINDOCUMENTATIONSAVED', {painlevel: painlevel, givenname: givenname}));
        });
    });
});

app.intent('welcome', conv => {
    conv.ask(conv.__('HELLO'));
});



// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);