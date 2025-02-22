```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.handleDataUpdate = functions.firestore.document('collection/{docId}').onWrite(async (change, context) => {
  if (!change.after.exists) {
    console.log('Document deleted');
    return null; // Handle delete operations
  }
  const newData = change.after.data();
  // Perform asynchronous operation and wait for it to complete before returning
  await db.collection('anotherCollection').add({updated: newData.value});
  console.log('Data updated and added to another collection.');
});
```