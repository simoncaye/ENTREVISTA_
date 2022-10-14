const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//configuración
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

//rutas
app.use('/login', require('./routes/auntenticar'))
app.use('/docs', require('./routes/docs'))

// inicio de servidors
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});