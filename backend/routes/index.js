const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const admin = require("firebase-admin");
const cors = require("cors");

const router = express.Router();
const razorpay = new Razorpay({
  key_id: "rzp_live_kDqZUwqGe9Q48L",
  key_secret: "8fmH4xrjdXwrgfn9zvYYtDGX",
});

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require("../aerophilia-2023-firebase-adminsdk-67ap4-f384c1d783.json"); // Replace with the path to your service account key JSON file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aerophilia-2023.firebaseio.com", // Replace with your Firebase project URL
});

// Create order endpoint
router.post("/create/orderid", async (req, res) => {
  try {
    const amount = calculateAmount(req.body.name);
    const rec = req.body.userId;
    const options = {
      amount: amount,
      currency: "INR",
      receipt: rec,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Calculate the amount based on the event name or other criteria
function calculateAmount(eventName) {
  if (eventName == "UI BATTLES") {
    return 300*100;
  } else if (eventName == "LINE FOLLOWER") {
    return 500 * 100;
  } else if (eventName == "CODE QUEST") {
    return 300 * 100;
  } else if (eventName == "CAD-CARNIVAL") {
    return 300 * 100;
  } else if (eventName == "MOMENTUM") {
    return 400 * 100;
  } else if (eventName == "TERRAGLIDE") {
    return 400 * 100;
  } else if (eventName == "SKY DIVE") {
    return 2500 * 100;
  } else if (eventName == "FRAMES") {
    return 200 * 100;
  } else if (eventName == "VISUAL VIBES") {
    return 200 * 100;
  } else if (eventName == "BOT SUMO") {
    return 500 * 100;
  } else if (eventName == "GOAL IN") {
    return 500 * 100;
  } else if (eventName == "EClash") {
    return 500 * 100;
  } else if (eventName == "LIFT OFF!") {
    return 1000 * 100;
  } else if (eventName == "FIRE POWER") {
    return 500 * 100;
  }
}

// Verify payment endpoint

router.post("/payment/verify", async (req, res) => {
  try {
    const body =
      req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    const secret = "8fmH4xrjdXwrgfn9zvYYtDGX"; // Replace with your Razorpay secret key
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    const signatureIsValid = expectedSignature === req.body.razorpay_signature;

    if (signatureIsValid) {
      const userId = req.body.userId;
      const eventName = req.body.eventName;
      const teamMembers = req.body.teamMembers;

      try {
        const db = admin.firestore();

        // Fetch the 'UID' document using the provided 'userId'
        const uidDocumentRef = db.collection("UID").doc(userId);
        const uidDocument = await uidDocumentRef.get();

        if (uidDocument.exists) {
          // Extract the 'uid' field from the 'UID' document
          const subcollectionUserId = uidDocument.data().uid;

          // Reference to the "events" subcollection within the user's document
          const userEventsCollectionRef = db
            .collection("Participant")
            .doc(subcollectionUserId)
            .collection("events");

          // Create a new document within the "events" subcollection for the specified event
          const eventDocRef = userEventsCollectionRef.doc(eventName);
          const eventData = {
            payment: true,
            report: false,
            signature: "Website",
            teamMembers: teamMembers,
          };

          // Set the data in the subcollection document
          await eventDocRef.set(eventData);

          // Reference to the EventList collection
          const eventListRef = db.collection("EventList");

          // Create a reference to the event within the EventList collection
          const eventListEventRef = eventListRef.doc(eventName);

          // Check if the event exists in EventList
          const eventListEvent = await eventListEventRef.get();

          if (eventListEvent.exists) {
            // The event already exists, update the flag field for the user's participation
            await eventListEventRef.collection("List").doc(subcollectionUserId).set({
              flag: subcollectionUserId, // Set the flag to the UID in string format
            }, { merge: true });
          } else {
            // The event does not exist, create a new event document in EventList
            const eventListEventData = {
              // You can include any other event-related data here
            };

            // Create the event document in EventList
            await eventListEventRef.set(eventListEventData);

            // Add the user's participation in the List subcollection with the UID in string format
            await eventListEventRef.collection("List").doc(subcollectionUserId).set({
              flag: subcollectionUserId, // Set the flag to the UID in string format
            });
          }

          // Respond with a success message
          res.status(200).json({ success: true });
        } else {
          console.error("UID document not found for the provided userId");
          res.status(404).json({ error: "UID document not found" });
        }
      } catch (error) {
        console.error("Error updating database:", error);
        res.status(500).json({ error: "Error updating database" });
      }
    } else {
      console.error("Invalid Signature");
      res.status(400).json({ error: "Invalid signature" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Define a new route for offline payments
router.post("/payment/offline", async (req, res) => {
  try {
    const userId = req.body.userId;
    const eventName = req.body.eventName;
    const teamMembers = req.body.teamMembers;

    try {
      const db = admin.firestore();

      // Fetch the 'UID' document using the provided 'userId'
      const uidDocumentRef = db.collection("UID").doc(userId);
      const uidDocument = await uidDocumentRef.get();

      if (uidDocument.exists) {
        // Extract the 'uid' field from the 'UID' document
        const subcollectionUserId = uidDocument.data().uid;

        // Reference to the "events" subcollection within the user's document
        const userEventsCollectionRef = db
          .collection("Participant")
          .doc(subcollectionUserId)
          .collection("events");

        // Create a new document within the "events" subcollection for the specified event
        const eventDocRef = userEventsCollectionRef.doc(eventName);
        const eventData = {
          payment: false,
          report: false,
          signature: "Nil",
          teamMembers: teamMembers,
        };

        // Set the data in the subcollection document for the user's participation
        await eventDocRef.set(eventData);

        // Reference to the EventList collection
        const eventListRef = db.collection("EventList");

        // Create a reference to the event within the EventList collection
        const eventListEventRef = eventListRef.doc(eventName);

        // Check if the event exists in EventList
        const eventListEvent = await eventListEventRef.get();

        if (eventListEvent.exists) {
          // The event already exists, update the flag field for the user's participation
          await eventListEventRef.collection("List").doc(subcollectionUserId).set({
            flag: subcollectionUserId,  // Set the flag to indicate user's participation
          }, { merge: true });
        } else {
          // The event does not exist, create a new event document in EventList
          const eventListEventData = {
            // You can include any other event-related data here
          };

          // Create the event document in EventList
          await eventListEventRef.set(eventListEventData);

          // Add the user's participation in the List subcollection
          await eventListEventRef.collection("List").doc(subcollectionUserId).set({
            flag: true, // Set the flag to indicate user's participation
          });
        }

        // Respond with a success message for offline payment
        res.status(200).json({ success: true });
      } else {
        console.error("UID document not found for the provided userId");
        res.status(404).json({ error: "UID document not found" });
      }
    } catch (error) {
      console.error("Error updating database for offline payment:", error);
      res.status(500).json({ error: "Error updating database" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
