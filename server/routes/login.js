const express = require('express');

const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');

const app = express();

module.exports = app;

app.post('/login', (req,res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB)=>{

        if( err ){
            return res.status(500).json({
                success: false,
                err
            });
        }

        if(!usuarioDB){
            return res.status(400).json({
                success: false,
                err:{
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }

        if( !bcrypt.compareSync( body.password, usuarioDB.password ) ){
            return res.status(400).json({
                success: false,
                err:{
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        res.json({
            ok:true,
            usuario: usuarioDB,
            token: '123'
        });

    })

});