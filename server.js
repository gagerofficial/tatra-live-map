const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public')); // Itt lesz az index.html

// --- KONFIGURÁCIÓ ---
const ROBLOX_API_KEY = "IDE_MÁSOLD_AZ_API_KULCSOT";
const UNIVERSE_ID = "9031765723"; // A játékod Universe ID-ja

// 1. ROBLOX -> WEB (Adatok fogadása a villamosoktól)
app.post('/update-tram', (req, res) => {
    const data = req.body;
    // Továbbküldjük a weboldalnak socketen
    io.emit('tramUpdate', data);
    res.status(200).send("OK");
});

// 2. WEB -> ROBLOX (Admin üzenet küldése)
io.on('connection', (socket) => {
    socket.on('adminAction', async (data) => {
        if (data.type === 'notify') {
            try {
                // Roblox Open Cloud Messaging Service hívás
                await axios.post(
                    `https://apis.roblox.com/messaging-service/v1/universes/${UNIVERSE_ID}/topics/AdminAnnouncements`,
                    { message: data.message },
                    { headers: { 'x-api-key': ROBLOX_API_KEY, 'Content-Type': 'application/json' } }
                );
                console.log("Admin üzenet kiküldve a Robloxnak:", data.message);
            } catch (err) {
                console.error("Hiba az API hívásnál:", err.response.data);
            }
        }
    });
});

server.listen(3000, () => {
    console.log('Project GOB Szerver fut a 3000-es porton!');
});
