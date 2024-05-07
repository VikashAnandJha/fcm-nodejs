const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

function sendFCM(message, data, id) {
    const API_KEY = "AAAAG35UpjU:APA91bEZ3pj-65BIXhPYtyAJw-fL-cvETeJu1HNjy76R7CS4QJtl38lDdn4TD7OVsa9tzurl038fsx1jyt5qCNpHtdropBhqkTHr8VL0LpmMcDaMGiV1i2O5Cp5GeT6H7DY8QLuh6Pp5";
    const url = 'https://fcm.googleapis.com/fcm/send';

    const notification = message;
    const fields = {
        registration_ids: [id],
        notification: notification,
        data: data,
        priority: 'high'
    };

    axios.post(url, fields, {
        headers: {
            'Authorization': 'key=' + API_KEY,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response.data);
            console.log('Success');
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

app.get('/', (req, res) => {
    const body = req.query.body;
    const title = req.query.title;
    const convid = req.query.convid;
    const fcm_id = req.query.fcm_id;
    const notid = req.query.notid;

    const digits = 5;
    const id = Math.floor(Math.random() * (Math.pow(10, digits) - Math.pow(10, digits - 1))) + Math.pow(10, digits - 1);

    const message = {
        body: body,
        title: title,
        notification_type: 'Test'
    };

    const data = {
        id: 55,
        convid: convid
    };

    if (body && title && fcm_id)
        sendFCM(message, data, fcm_id);

    res.send('Notification sent!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
