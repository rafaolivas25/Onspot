const express = require('express')
const app = express()
const client = require('../models/connection')
const {compileTrust} = require("express/lib/utils");

//Fazer get all reserva
const getreserva = (req,res)=>{
  client.query('select * from reserva ',(error,results)=>{
    if(error)
    {
      throw error
    }
    res.status(200).json(results)
  })
}


//criar reserva
const createreserva = (request, response) => {
  const reserv = request.body
  console.log(reserv)
  var query = "INSERT INTO reserva (reserva_id,classificacao_id,hora_de_entrada,hora_saida) VALUES (1,1,'" + reserv.entrada.toString() + "','" + reserv.saida.toString() + "')";
  var query1 = "INSERT INTO rate (classificacao_id) VALUES(1)";
  console.log(query)
  console.log(query1)
  client.query(query1, (error, results) => {
    if (error) {
      throw error
    }
    client.query(query, (error, results) => {
      if (error) {
        throw error
      }
    })
    response.status(201).send("Reserva added with ID: ")

  })

}

//DELETE DA RESERVA (AINDA POR VER)

const reservadelete = (request, response) => {
  const reserv = request.body

  const query1 = "SELECT !ISNULL((SELECT ISNULL(reserva_id) FROM onspot.reserva where hora_de_entrada='" + reserv.entrada.toString() + "' and hora_saida = '" + reserv.saida.toString() + "'))as existe";
  const del = "DELETE FROM onspot.reserva where utilizador_email= '" + reserv.email.toString() + "'"; //DUVIDAS DE COMO ALTERAR ESTA QUERY
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
        if((reserv.entrada==reserv.entrada)) {

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

module.exports = {

  getreserva,
  createreserva,
  reservadelete

}
