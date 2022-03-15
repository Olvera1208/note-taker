const fs = require("fs");
const express = require("express");
const path = require("path");
let db = require("./db/db.json");
const uniqid = require("uniqid");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/api/notes', (req, res) =>
    res.json(database)
);

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);


app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;

    // determines if specified id of note exists
    const deletedNote = db.find(note => note.id === id);

    if(deletedNote) {
        console.log(deletedNote);
        db = db.filter(note => note.id !== id);

        fs.writeFile(`./db/db.json`, JSON.stringify(db), (err) =>
        err ?
        console.error(err) 
        :console.log('Note has been successfully deleted.')
        ); 
        
        res.status(200).json(database)
    } else {
        console.log(deletedNote);
        res.status(404).json('Your note does not appear to exist.')
    }                                  
});

app.post("/api/notes", (req, res) => {
    const { title, text, id} = req.body;
    
    if( title && text) {
        const newResponse = {
            title, 
            text, 
          id: uniqid()};
          database.push(newResponse)
          
          fs.writeFile(`./db/db.json`, JSON.stringify(database), (err) =>
          err ?
          console.error(err) 
          : console.log(`${newResponse.title} has been written to JSON file`)
          ); 
          
          res.status(200).json(database);
        } else {
          res.status(400).json('Error in posting notes');
        }
    });
    
    app.get("*", (req, res) =>
        res.sendFile(path.join(__dirname, "/public/index.html"))
    );

app.listen(PORT, () =>
    console.log(`http://localhost:${PORT}`)
);