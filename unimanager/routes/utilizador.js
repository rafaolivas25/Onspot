const express = require('express')
const app = express()
const client = require('../models/connection')
const {compileTrust} = require("express/lib/utils");

const getutilizador = (req,res)=>{
    client.query('select * from utilizador ',(error,results)=>{
        if(error)
        {
            throw error
        }
        res.status(200).json(results)
    })
}



const login= (request, response) => {
    const users = request.body
    console.log("user:  "+JSON.stringify(users))
    client.query('select utilizador_nome,utilizador_email from utilizador ' +
        'where utilizador_email = \'' + users.email.toString() + '\' and utilizador_pass = \''+users.pass.toString()+'\'' , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}


const createutilizador = (request, response) => {
     const users = request.body
    console.log(users)
    const query = "INSERT INTO utilizador (utilizador_nome,utilizador_genero, utilizador_email,utilizador_pass,utilizador_telefone,utilizador_morada,utilizador_codigo_postal,utilizador_porta,utilizador_datanasc) VALUES ('" + users.nome.toString() + "','" + users.genero.toString() + "','" + users.email.toString() + "','" + users.pass.toString() + "','" + users.telefone.toString() + "','" + users.morada.toString() + "','" + users.codigo_postal.toString() + "','" + users.porta.toString() + "','" + users.datanasc.toString() + "')";
    console.log(query)
     client.query(query, (error, results) => {
        if (error) {
             throw error
         }
         response.status(201).send("User added with ID: ")
     })
}

const userdelete = (request, response) => {
    const users = request.body

    const query1 = "SELECT !ISNULL((SELECT ISNULL(utilizador_id) FROM onspot.utilizador where utilizador_email='" + users.email.toString() + "' and utilizador_pass = '" + users.pass.toString() + "'))as existe";
    const del = "DELETE FROM onspot.utilizador where utilizador_email= '" + users.email.toString() + "'";
    try {
    client.query(query1, (error, results) => {
        if (error) {throw error}
        if(!(results[0].existe==1))
        {
                    client.query(del, (error, results3) => {
                        if (error) {throw error}
                        response.status(200).json(results3)
                    })
        }
        else
        {
            if((users.email==users.email)) {

                    client.query(del, (error, results3) => {
                        if (error) {throw error }
                        response.status(200).json(results3)
                    })

            }
        }
    })
    }
    catch (e) {
        console.log(e);
    response.status(200).json("error")
    }
    finally {
        console.log("success");
    }
}

const updateuser = (request, response) => {
    try {
        const users = request.body
        console.log(users)
        const query1 = "SELECT !ISNULL((SELECT ISNULL(utilizador_id) FROM onspot.utilizador where utilizador_email='" + users.email.toString() + "' and utilizador_pass='" + users.pass.toString() + "'))as existe";
        const up = "UPDATE  onspot.utilizador SET utilizador_nome='" + users.novonome.toString() + "',utilizador_pass='" + users.novopass.toString() + "' where utilizador_email='" + users.email.toString() + "'";
        console.log(up)
        console.log(users)
        client.query(query1, (error, results) => {
            if (error) {throw error}
            if(!(results[0].existe==1))
            {
                client.query(up, (error, results3) => {
                    if (error) {
                        throw error
                    }
                    response.status(200).json(results3)
                })
            }
            else
            {
                client.query(up, (error, results3) => {
                if (error) {throw error
                    throw new Error(error);}
                response.status(200).json(results3)
            })
            }
        })
    }
    catch (e) {
        console.log(e);
        response.status(200).json("error")
    }
    finally {
        console.log("success");
    }
}

//favoritos dos utilizadores
const getfavutilizadores= (request, response) => {
    const users = request.body
    console.log(verifica(users.email.toString(),users.pass.toString()))
    //if(verifica(users.email.toString(),users.pass.toString())){
    if(true){
        client.query('select utilizador_id from utilizador ' +
            'where utilizador_email = \'' + users.email.toString() + '\' and utilizador_pass = \''+users.pass.toString()+'\'' , (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            console.log(results[0])
            const aa = JSON.stringify(results);
            const bb = JSON.parse(aa)
            console.log(aa)
            console.log(bb[0].utilizador_id)
            const id = parseInt(bb[0].utilizador_id, 2);
            console.log(id)
            const query = "INSERT INTO favoritos (estacionamento_id,utilizador_id) VALUES ('" + users.estacionamento_id.toString() + "','" + id + "')";
            client.query(query, (error, results2) => {
                if (error) {
                    throw error
                }
                response.status(201).send("User added with ID: ")
            })
        })
    }else{response.status(200).json("user nao existe")}

}

function verifica (email,pass){
    try {
        const query1 = "SELECT !ISNULL((SELECT ISNULL(utilizador_id) FROM onspot.utilizador where utilizador_email='" + email.toString() + "' and utilizador_pass='" + pass.toString() + "'))as existe";
        client.query(query1, (error, results) => {
            if (error) {throw error}
            if((results[0].existe==1))
            {
                //console.log(1)
                return true
            }
            else
            {
                //console.log(0)
                return false
            }
        })
    }
    catch (e) {
        console.log(e);
    }
    finally {
        //console.log("success");
    }
}



module.exports = {
    getutilizador,
    login,
    createutilizador,
    userdelete,
    updateuser,
    getfavutilizadores,

}