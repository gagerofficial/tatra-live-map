const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

app.use(express.json());
app.use(express.static('public')); // Itt lesz a weboldalad

let trams = {}; // Itt tároljuk az élő villamosokat

// ROBLOX ide küldi az adatokat
app.post('/update', (req, res) => {
    const data = req.body;
    if (data.id) {
        data.lastUpdate = Date.now();
        trams[data.id] = data; // Mentés/Frissítés
        io.emit('tramUpdate', data); // Küldés a weboldalnak azonnal
    }
    res.status(200).send('OK');
});

// Weboldal lekéri az összes villamost indításkor
app.get('/api/trams', (req, res) => {
    res.json(Object.values(trams));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Dispatcher Center fut a ${PORT} porton`));