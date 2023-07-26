require('rootpath')();
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');

const configuracion = require("config.json");


const controladorPersona = require("controller/personaController.js");
 const controladorUsuario = require("controller/usuarioController.js");
// const controladorArticulo = require("controller/articuloController.js");

app.use('/api/persona', controladorPersona);
 app.use('/api/usuario', controladorUsuario);
// app.use('/articulos', controladorArticulo);

//aplicacion --> cuando se ejecuta el use hace dos cosas
//(todo lo que entre aca, enviamelo aca)

app.listen(configuracion.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("sevidor escuchando en el puerto " + configuracion.server.port);
    }
});


app.delete('/api/persona/:dni', (req, res) => {
    $query = 'DELETE FROM persona WHERE dni = ?';

    connection.query($query, req.params.dni, function (err, rows) {
        if (err) {
            res.status(500).send(err);
            return;
        } else {
            if (rows.affectedRows == 0) {
                res.status(404).send({
                    message: "no se encontró la persona " + req.params.dni,
                    detail: rows
                });
            } else {
                res.send({
                    message: "se elimino la persona " + req.params.dni,
                    detail: rows
                });
            }
        }
    });

});