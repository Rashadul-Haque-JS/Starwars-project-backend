const express = require('express')
const app = express()
const axios = require('axios');
app.use(express.static('public'))
app.set('view engine', 'ejs');
const { PromisedDatabase } = require("promised-sqlite3")
const db = new PromisedDatabase()
const getChar = require('./modules/char')

let characters;
async function getResponse() {

characters = await getChar.fetchChar(axios);
console.log(characters)
} 

getResponse()



// Create table with values
async function InsertChar() {
    try {

        await db.open("./starwars.db");
        await db.run("CREATE TABLE IF NOT EXISTS starfighters( FirstName TEXT  NOT NULL,LastName TEXT  NOT NULL,Planet TEXT NOT NULL,Galaxy TEXT NOT NULL, Email TEXT NOT NULL UNIQUE)")

        // await db.run("INSERT INTO starfighters ('FirstName','LastName','Planet','Galaxy','Email' ) VALUES ('Luke', 'Skywalker', 'Tatooine', 'GFFA', 'luke.skywalker@galaxy.com')");

        // await db.run("INSERT INTO starfighters ('FirstName','LastName','Planet','Galaxy','Email' ) VALUES ('Leia ', 'Organa', 'Alderaan','GFFA', 'leia.organa@galaxy.com')");

        // await db.run("INSERT INTO starfighters ('FirstName','LastName','Planet','Galaxy','Email' ) VALUES ('Lando', 'Calrissian', 'Socorro','GFFA', 'lando.carlissian@galaxy.com')");

        // await db.run("INSERT INTO starfighters ('FirstName','LastName','Planet','Galaxy','Email' ) VALUES ('Darth ', 'Maul', 'Dathomir','GFFA', 'darth.maul@galaxy.com')");


      } catch (err) {
        console.error(err);
    }
}

InsertChar() 



// Fetch single value (by command 'db.get') or all values( by command 'db.all') from the created table
async function getStarFighters() {
    try {
        await db.open("./starwars.db");
        // const row = await db.all("SELECT * FROM starfighters");
        // const row = await db.get("SELECT * FROM starfighters WHERE Galaxy IS 'GFFA'");
        const row = await db.all("SELECT * FROM starfighters WHERE Galaxy IS 'GFFA'");

        await db.close();
        return row

    } catch (err) {
        console.error(err);
    }
}

// Delete table 

/*
async function removeTable() {
   try {
   await db.open("./starwars.db")
   await db.run("DROP TABLE starfighters")
   } catch (err) {
       console.log(err)
   }
}
removeTable() 
*/

let charcs;

app.get('/', (req, res) => {
res.render('pages/charDetails', {characters})
  
})


app.post('/charsCard', (req, res) => {
    charcs = req.body
    console.log(charcs)
    res.redirect('pages/character')
})



app.get('/pages/character', async (req, res) => {
    let starfighters = await getStarFighters()
    res.render('pages/character', { starfighters })
})


app.listen(5000)
console.log('server running on port 5000')