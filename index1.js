const ws = require('ws');
const fs = require('fs');
const path = require('path');

const dirName = 'public';
const webStockServer = ws.Server;


const server = new webStockServer({
    port: 10103,
});


server.on('connection', (wsServer) => {
    let fileName, i = 0;
    wsServer.on('message', (data) => {
        if (Buffer.isBuffer(data)) {
            const method = i++ ? 'appendFileSync' : 'writeFileSync';
            console.log(data);
            const filePath = path.join(__dirname, dirName, fileName);
            fs[method](filePath, data, 'utf-8');
        } else {
            fileName = data;
        }
    });
    wsServer.send('go');
});