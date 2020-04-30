const express = require('express')
const app = express();
const cors = require('cors')

const date = new Date()

app.use(cors())
app.use(express.json())

app.post('/sendMessage', (request, response) => {
    
    const { name, message } = request.body;

    console.log(name, message)
    response.sendStatus(200)
})

app.listen(7878)