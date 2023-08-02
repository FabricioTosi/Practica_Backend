require('rootpath')();

var persona_db = {};

const { query } = require('express');
const mysql = require('mysql');
const configuracion = require("config.json");


var connection = mysql.createConnection(configuracion.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("base de datos conectada");
    }
});


//-- antes -------------------------------------------------------------------
//teniamos un solo archivo que era el index //codificaba todo en la misma funcion


//-- ahora -------------------------------------------------------------------
//tenemos 2 archivos que son el persona_index y la persona_BD
//tengo que codificar en dos funciones y comunicarme entre ellas
//persona_index (interaccion con el servidor): se encargara de mandarle los mensajes al frontend y de hacer peticiones a persona_BD  
//persona_BD (interaccion con la base de datos): recibira peticiones de persona_index y debera devolver una respuesta
//¿como me comunico?: una forma invocar(mandar una funcion [carretilla vacia]) ---> atender (recibir la funcion que me mandaron)
//persona_BD are lo que tenga que hacer y enviare mis datos a la funcion que me enviaron [llenar la carretilla]




persona_db.getAll = function (funCallback) {
    var consulta = 'SELECT * FROM persona';
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback(err);
            return;
        } else {
            funCallback(undefined, rows);
        }
    });
}



persona_db.create = function (persona, funcallback) {
    consulta = "INSERT INTO persona (dni, apellido, nombre) VALUES (?,?,?);";
    params = [persona.dni, persona.apellido, persona.nombre];

    connection.query(consulta, params, (err, detail_bd) => {
        if (err) {

            if (err.code == "ER_DUP_ENTRY") {
                funcallback({
                    mensajito: "La persona ya fue registrada",
                    detalle: err
                });
            } else {
                funcallback({
                    mensajito: "error diferente",
                    detalle: err
                });
            }
        } else {

            funcallback(undefined, {
                mensajito: "se creo la persona " + persona.nombre + persona.apellido,
                detalle: detail_bd
            });
        }
    });
}

persona_db.delete = function (id_persona_a_eliminar, retorno) {
    consulta = 'DELETE FROM persona WHERE dni = ?';
    params = [id_persona_a_eliminar];

    connection.query(consulta, params, (err, result) => {
        if (err) {
            retorno({ message: err.code, detail: err }, undefined);
        } else {

            if (result.affectedRows == 0) {
                retorno(undefined, {
                    message: "No se encontro a la persona",
                    detalle: result
                });
            } else {
                retorno(undefined, {
                    mensajito: "se elimino la persona",
                    detail: result
                });
            }
        }
    });
}

persona_db.update("/", (req, res) => {

    parametros = [req.body.nombre, req.body.apellido, req.body.dni];
    $query = `UPDATE persona set dni = ?, nombre = ?, apellido = ? WHERE dni = ?`;

    connection.query($query, parametros, function (err, rows) {
        if (err) {
            res.status(500).send({
                messaje: "error en back end",
                detail: err
            });
            return;
        } else {
            if (rows.affectedRows == 0) {
                res.status(404).send({
                    message: "no se encontro la persona con el dni: " + req.params.dni,
                    detail: rows
                });
            } else {
                message: "se modifico la persona con el dni: " + req.params.dni;
                detail: rows

            }
        }
    }
    )
}
);

module.exports = persona_db;