require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var personaDb = require("model/persona.js");

//req : es lo que llega desde el frontend (en nuestro caso Postman)
//res : respuesta enviada desde el servidor al frontend

//atendiendo el endpoint /api/persona mediante el metodo GET 
// |--> llamar a la funcion getAll() que está en el archivo encargado de hestionar lo relacionado a la tabla PERSONA en la BD
//      y procesara la respuesta en una funcion callback
// |--> GetAll() enviara como respuesta un error (que le enviará la base de datos) o los datos en caso de exito   


app.get('/', (req, res) => {

    personaDb.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });

});

app.get('/apellido', (req, res) => {

    personaDb.getByApellido((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });

});

app.get('/nickname', (req, res) => {

    personaDb.getUser((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });

});

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


app.post('/', (req, res) => {

    let persona = req.body;
    personaDb.create(persona, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });

});

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

app.delete('/:dni', (req, res) => {

    let id_persona_a_eliminar = req.params.dni;
    personaDb.delete(id_persona_a_eliminar, (err, result_model) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result_model.detail.affectedRows == 0) {
                res.status(404).send(result_model.message);
                
            } else {
                res.send(result_model); 
            }
        }
    });

});

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


app.put("/", (req, res) => {

    parametros = [req.body.nombre, req.body.apellido, req.body.dni];
    personaDb.update(parametros, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });
  }
);

module.exports = app;

