// Functions dependencies
const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')(); // storage specific functions
const os = require('os'); // operating system specific functions (find path to file)
const path = require('path'); // function for constructing path
// run native programs on operating system and get back a promise
const spawn = require('child-process-promise').spawn; 

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Function that reacts to storage events -> onChange to default bucket 'object()'
exports.onFileChange = functions.storage.object().onChange(event => {
    const object = event.data;
    const bucket = object.bucket;
    const contentType = object.contentType;
    const filePath = object.name;
    console.log('File change detected, function execution started'); 

    // Check if file has been deleted
    if (object.resourceState === 'not_exists') {
        console.log('We deleted a file, exit...');
        return;
    }

    // Check path string if the file has been resized, then don't rename 
    if(path.basename(filePath).startsWith('resized-')) {
        console.log("We already renamed that file!");
        return;
    }

    // create new destination bucket
    const destBucket = gcs.bucket(bucket);
    // temporary File Path 
    // join path from os with the uploaded filepath (filename)
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    const metadata = {
        contentType: contentType
    }; // persist the content type

    // download the file from the bucket into the temporary folder
    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then( () => { // on success ( The file has been downloaded to tmpFilePath)
        return spawn('convert', [ // use imageMagick to convert file
            tmpFilePath, '-resize', '500x500', tmpFilePath // resize to 500x500 (make it fit)
        ]).then(() => {
            return destBucket.upload(tmpFilePath, {
                destination: 'resized-' + path.basename(filePath), // rename with 'renamed-' prefix
                metadata: metadata // set content type to same as before
            })
        });
    });
});