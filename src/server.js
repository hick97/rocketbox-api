const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors());

//Configurando para o app ouvir tanto protocolo http, como protocolo WS(web socket)
const server = require('http').Server(app);
const io = require('socket.io')(server);

//Como se fosse "rotas" para o protocolo WS
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

//Database
mongoose.connect('mongodb+srv://deploy:deploy123@cluster0-hfitp.mongodb.net/rocketbox?retryWrites=true', {
    useNewUrlParser: true   
});

app.use((req, res, next)=>{
    req.io = io;

    //Processsa esse middleware e dá continuidade
    return next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/files', express.static(path.resolve(__dirname,'..', 'tmp', 'uploads')))

app.use('/', require('./routes/routes'));

const port = process.env.PORT || 3333;

server.listen(port, err =>{
    if(err){
        console.log('error');
    }else{
        console.log('Server is running on port 3333');
    }
});