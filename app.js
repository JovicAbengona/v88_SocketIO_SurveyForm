const express = require("express");
const app     = express();
const server  = app.listen(8080, () => { console.log("Listening on 8080"); });
const io      = require('socket.io')(server);

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get("/", (request, response) => {
    response.render("index");
});

io.on('connection', (socket) => {
    console.log("User connected " + socket.id);

    socket.on("posting_form", data => {
        let random_number = Math.floor(Math.random() * 1000) + 1;
        let message = {
            main: `You emitted the following information to the server:
                    { name: '${data.form_data.name}', dojo_location: '${data.form_data.dojo_location}', fave_language: '${data.form_data.fave_language}', 
                    comment: '${data.form_data.comment}' }`,
            random: `Your lucky number emitted by the server is ${random_number}`
        };

        socket.emit("updated_message", {message: message});
    });
});