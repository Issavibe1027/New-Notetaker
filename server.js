const path = require('path')
const { notStrictEqual } = require('assert');
const express = require('express');
const fs = require("fs");



const app = express();


app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data))
    })
})

app.post('/api/notes', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const dbData = JSON.parse(data); 

        
        req.body.id = dbData.length + 1;

        
        dbData.push(req.body);

        fs.writeFile('./db/db.json', JSON.stringify(dbData), (err) => {
            res.send('Note has been added!')
        })
    })
})



  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})


app.listen(process.env.PORT || 3001, () => {
    console.log('App is now listening to PORT 3001!')
})





app.delete("/api/notes/:id", (req, res) => {
             fs.readFile('./db/db.json', 'utf8', (err, data) => {
                 const dbData = JSON.parse(data); 

                const filteredNotes = dbData.filter(function(note) {
                    return note.id != req.params.id;
           })
       
             fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
                      res.send('Note has been added!')
                 })
            })
        
});


   