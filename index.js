const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


let currentBotUsername = 'KleinMoretiBot'; 

app.get('/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    const redirectUrl = `https://t.me/${currentBotUsername}?start=${fileId}`;
    res.redirect(redirectUrl);
});

// Admin route to update the bot username
app.post('/update-bot', express.json(), (req, res) => {
    const { newBotUsername, secret } = req.body;

    if (secret !== process.env.SECRET_KEY) {
        return res.status(403).send('Forbidden');
    }

    currentBotUsername = newBotUsername;
    res.send(`Bot username updated to: ${newBotUsername}`);
});

app.listen(PORT, () => {
    console.log(`Redirect server running on port ${PORT}`);
});
