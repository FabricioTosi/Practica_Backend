// require('rootpath')();
// const express = require('express');
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// var usuarioDb = require("model/user.js");

// //req : es lo que llega desde el frontend (en nuestro caso Postman)
// //res : respuesta enviada desde el servidor al frontend

// //atendiendo el endpoint /api/persona mediante el metodo GET 
// // |--> llamar a la funcion getAll() que está en el archivo encargado de hestionar lo relacionado a la tabla PERSONA en la BD
// //      y procesara la respuesta en una funcion callback
// // |--> GetAll() enviara como respuesta un error (que le enviará la base de datos) o los datos en caso de exito   


// app.get('/', (req, res) => {

//     usuarioDb.getAll((err, resultado) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(resultado);
//         }
//     });

// });


// //---------------------------------------------------------------------------------------------------------------------
// //---------------------------------------------------------------------------------------------------------------------


// app.post('/', (req, res) => {

//     let usuario = req.body;
//     usuarioDb.create(usuario, (err, resultado) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.send(resultado);
//         }
//     });

// });

// module.exports = app;

// var uno = {

//     "nombre": "",
//     "apellido": null,
//     "mail": ""
// };

require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var usuario_Db = require("model/user.js");

//req : es lo que llega desde el frontend (en nuestro caso Postman)
//res : respuesta enviada desde el servidor al frontend

//atendiendo el endpoint /api/persona mediante el metodo GET 
// |--> llamar a la funcion getAll() que está en el archivo encargado de hestionar lo relacionado a la tabla PERSONA en la BD
//      y procesara la respuesta en una funcion callback
// |--> GetAll() enviara como respuesta un error (que le enviará la base de datos) o los datos en caso de exito   


app.get('/', (req, res) => {

    usuario_Db.getAll((err, resultado) => {
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

    let usuario = req.body;
    usuario_Db.create(usuario, (err, rows) => {
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

    let id_usuario_a_eliminar = req.params.dni;
    usuario_Db.delete(id_usuario_a_eliminar, (err, result_model) => {
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

app.put('/', (req, res) => {

    parametros = [req.body.nombre, req.body.apellido, req.body.dni];
    usuario_Db.update(parametros, (err, result_model) => {
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


module.exports = app;