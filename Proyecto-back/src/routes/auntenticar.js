const express = require('express'),
      bodyParser = require('body-parser'),
      jwt = require('jsonwebtoken'),
      config = require('./config/config'),
      app = express();
      const { Router } = require("express");
const router = Router();

app.set('llave', config.llave);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Inicio');
});
//enviamos los datos y se nos genera el token
router.post('/autenticar', (req, res) => {
    if(req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
  const payload = {
   check:  true
  };
  const token = jwt.sign(payload, app.get('llave'), {
   expiresIn: 1440
  });
  res.json({
   mensaje: 'Autenticación correcta',
   token: token
  });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
})

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

//esto es lo que nos muestra una vez logeados correctamente
 router.get('/datos', rutasProtegidas, (req, res) => {
    const datos = [
     { id: 1, nombre: "Asfo" },
     { id: 2, nombre: "Denisse" },
     { id: 3, nombre: "Carlos" }
    ];
    
    res.json(datos);
   });

module.exports = router