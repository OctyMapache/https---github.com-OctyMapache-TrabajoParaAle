const express = require('express')

const router = express.Router()

const conexion = require('../database')


router.get('/cliente', async(req,res) =>{

    const db = await conexion.obtener_conexion()

    const rows = await db.query('select * from cliente')

    res.json(rows)
})

router.post('/cliente',async (req,res) => {

    const unCliente = req.body;

    const db = await conexion.obtener_conexion()

    await db.query(`insert into cliente (razonsocial,telefono,Direccionip,DescripcionEquipo,SistemaOperativo )
    VALUES ('${unCliente.razon_social}','${unCliente.telefono}','${unCliente.direccion_ip}', '${unCliente.descripcion_equipo}','${unCliente.sistema_operativo}') `)

    res.json('El cliente se guardó exitosamente!')

})

router.put('/cliente/:codigo', async(req,res) => {
    const db = await conexion.obtener_conexion()

    const id = req.params.codigo
    const cm = req.body

    await db.query(`update cliente
    set razon_social = '${cm.razon_social}', telefono='${cm.telefono}', direccion_ip = ${cm.direccion_ip}, descripcion_equipo='${cm.descripcion_equipo}', sistema_operativo = ${cm.sistema_operativo}
    where id_cliente = ${id}`);

    res.json('Actualización exitosa!')
})

router.delete('/cliente/:codigo', async(req,res) => {
    const db = await conexion.obtener_conexion()
    const id = req.params.codigo

    await db.query(`delete from cliente where id_cliente = ${id}`)

    res.json('La eliminación fue exitosa!')
})

router.get('/cliente/:codigo', async(req,res) => {
    const db = await conexion.obtener_conexion()
    const id = req.params.codigo
    
    const row = await db.query(`select * from cliente where id_cliente = ${id}`)

    res.json(row[0])
})

module.exports = router


