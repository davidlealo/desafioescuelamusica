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

app.put('/canciones/:id', (req, res) =>{
    //Usar params con ID
    const {id} = req.params

    //Identificar la canción a modificar
    const song = req.body
    
    //Leer el archivo 
    const songs = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))

    //Buscar el registro
    const index = songs.findIndex(s => s.id == id)
    songs[index] = song

    //Sobre escribir el archivo
    fs.writeFileSync('repertorio.json', JSON.stringify(songs))

    //Enviar notificación al servidor
    res.send('Canción modificada de forma exitosa')
})