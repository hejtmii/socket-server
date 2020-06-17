const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.get('/', function(req, res) {
    res.send(
`Server up and running!<br />
${new Date().toLocaleTimeString()}
<meta http-equiv="refresh" content="5">
`);
});

io.origins((origin, callback) => {
    callback(null, true);
});

io.sockets.on('connection', function(client) {
    client.on('richTextChanges', function(changes) {
        client.broadcast.emit('notify', 'richTextChange', changes);
    });
});

if (process.env.PORT) {
    app.set('port', process.env.PORT);
}

server.listen(app.get('port'));

const port = server.address().port;
console.log('Express server listening on port ' + port);
