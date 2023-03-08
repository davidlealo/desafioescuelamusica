const express = require('express')
const app = express()
const fs = require('fs')

app.listen(3000, ()=>{console.log('Servidor iniciado')})

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

app.use(express.json())

app.post('/canciones', (req, res) =>{
    //Leer el archivo json
    const file = fs.readFileSync('repertorio.json', 'utf8')
    const fileParse = JSON.parse(file)

    //Añadir nuevo registro
    const newData = req.body
    fileParse.push(newData)

    //Sobre escribir el archivo
    const writeFile = fs.writeFileSync('repertorio.json', JSON.stringify(fileParse))

    //Notificar el ingreso del nuevo registro
    res.send('Nuevo registro creado')
} )

app.get('/canciones', (req, res) =>{
    //Leer archivo JSON
    const songs = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    
    //Enviar contenido JSON a ruta /canciones
    res.send(songs)
})
