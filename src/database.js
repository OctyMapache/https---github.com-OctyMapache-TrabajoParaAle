const mariadb = require('mariadb')

const parametros = mariadb.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'monitoreo_db',
})

async function obtener_conexion()
{
    //obtenemos la instancia de conexion
    const conexion = await parametros.getConnection()
    return conexion
}

module.exports = { obtener_conexion }
