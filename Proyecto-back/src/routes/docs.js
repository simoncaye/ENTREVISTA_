const { Router } = require("express");
const router = Router();
const multer = require('multer')

const storage=multer.diskStorage({  //lugar donde guarda los archivos
    destination:(req,file,cb) =>{
        cb(null,'./docs')
    },
    filename:(req,file,cb) => {  //aqui les asignamos un nombre para que no se sobrescriban
        const ext=file.originalname.split('.').pop()
        cb(null,Date.now()+'.'+ext)
    }
})
const upload = multer({storage}) // mediante esta constante podremos detectar el archivo y guardarlo

router.post('/',upload.single('file'),(req,res)=>{ //estamos diciendo que lo guarde en lo carpeta docs uno por uno
    res.send({data:'Archivo cargado'})
})

module.exports = router