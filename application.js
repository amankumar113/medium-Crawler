const port = process.env.PORT || 8081
const express = require('express')
const make_request = require('./request')
const path = require('path')
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/idioms_db");

const app = express()

const srcDirectoryPath = path.join(__dirname, './src')

app.use(express.static(srcDirectoryPath))
app.use(express.json())

app.get('', (req, res) => {
    res.sendFile(`${srcDirectoryPath}/index.html`)
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
