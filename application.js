const port = process.env.PORT || 8081
const express = require('express')
const make_request = require('./request')
const path = require('path')
const mongoose = require("mongoose");
//connecting database
try{
    mongoose.connect("mongodb+srv://aman-personal:8433012381aBc%40@cluster0.iq5ip.mongodb.net/mediumcrawler?retryWrites=true&w=majority");
    // mongoose.connect("mongodb://localhost:27017/idioms_db");
    console.log(`database connected`);
} 
catch(err) {
    console.log(err);
}
const app = express()

const publicDirectoryPath = path.join(__dirname, './public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.get('', (req, res) => {
    res.sendFile(`${publicDirectoryPath}/index.html`)
})

app.get('/search', async (req, res) => {
    tags = req.query.tags
    page = req.query.page
    
    if(!page) {
        page = 0
    }
    if(!tags) {
        res.status(400).send({'error': 'No tags provided'})
    }

    make_request(tags, 10, parseInt(page)).then(result => {
        res.status(200).send(result)
    })
})
app.listen(port, () => {
    console.log('Server is running on', port)
})
