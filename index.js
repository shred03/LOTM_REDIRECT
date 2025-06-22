const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let currentBotUsername = 'KleinMoretiBot'; 

// Admin route to update the bot username (must be before /:fileId route)
app.post('/update-bot', express.json(), (req, res) => {
    const { newBotUsername, secret } = req.body;

    if (secret !== process.env.SECRET_KEY) {
        return res.status(403).send('Forbidden');
    }

    currentBotUsername = newBotUsername;
    res.send(`Bot username updated to: ${newBotUsername}`);
});

app.get('/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    const redirectUrl = `https://t.me/${currentBotUsername}?start=${fileId}`;
    res.redirect(redirectUrl);
});

app.get('/', (req, res) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LOTM</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
                font-family: 'Arial', sans-serif;
            }
            
            .lotm-text {
                font-size: 8rem;
                font-weight: bold;
                color: #fff;
                text-shadow: 
                    0 0 10px #4a90e2,
                    0 0 20px #4a90e2,
                    0 0 30px #4a90e2,
                    0 0 40px #4a90e2;
                letter-spacing: 0.5rem;
                animation: pulse 2s ease-in-out infinite alternate;
            }
            
            @keyframes pulse {
                from {
                    text-shadow: 
                        0 0 10px #4a90e2,
                        0 0 20px #4a90e2,
                        0 0 30px #4a90e2,
                        0 0 40px #4a90e2;
                }
                to {
                    text-shadow: 
                        0 0 20px #4a90e2,
                        0 0 30px #4a90e2,
                        0 0 40px #4a90e2,
                        0 0 50px #4a90e2,
                        0 0 60px #4a90e2;
                }
            }
            
            @media (max-width: 768px) {
                .lotm-text {
                    font-size: 4rem;
                    letter-spacing: 0.3rem;
                }
            }
            
            @media (max-width: 480px) {
                .lotm-text {
                    font-size: 3rem;
                    letter-spacing: 0.2rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="lotm-text">LOTM</div>
    </body>
    </html>
    `;
    
    res.send(htmlContent);
});

app.listen(PORT, () => {
    console.log(`Redirect server running on port ${PORT}`);
});