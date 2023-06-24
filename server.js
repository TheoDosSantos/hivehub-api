const express = require('express')
const app = express()

//ROUTES

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(8000, ()=> {
    console.log(`Node API app is running on port 8000`);
})
