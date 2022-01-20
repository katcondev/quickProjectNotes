const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// routes to pages

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html");
});

// routes to api

app.post("/api/notes", (req, res) => {
    res.readFile(__dirname + "/db/db.json", 'utf8', (error, notes) => {
        if (error) {
            return console.log(error);
        }
        notes = JSON.parse(notes);

        var id = notes[notes.length - 1].id + 1;
        var newNote = { title: req.body.title, text: req.body.text, id:id };
        var activeNote = notes.concat(newNote);
    } )
} )