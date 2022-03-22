const express = require('express')
const { listen } = require('express/lib/application')
const app = express()

const { PromisedDatabase } = require("promised-sqlite3")

const db = new PromisedDatabase()
async function test() {
    try {
        await db.open("./chinook.db"); 
  
        const row = await db.get("SELECT * FROM customers");
        console.log(row);
        await db.close();

    } catch(err) {
        console.error(err);
    }
}

test();



listen(8000)
console.log('server on port 8000')