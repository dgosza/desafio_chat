const express = require('express')

const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())

//

const dataObject = new Date;

app.post('/sendMessage', async (request, response) => {

    //data
    const { name, message } = request.body
    const date = `${dataObject.getDate()}/${dataObject.getMonth() + 1}/${dataObject.getFullYear()}`
    const hour = `${dataObject.getHours()}:${dataObject.getMinutes()}`

    const lineOfMessage = {
        date,
        name,
        hour,
        message
    }

    console.log(lineOfMessage)
    response.send(lineOfMessage).sendStatus(200)
})

app.listen(7878)