const express = require('express')
const app = express()
const client = require('../models/connection')
const {compileTrust} = require("express/lib/utils");

//Fazer get all estacionamento
const getestacionamento = (req,res)=>{
  client.query('select * from estacionamento ',(error,results)=>{
    if(error)
    {
      throw error
    }
    res.status(200).json(results)
  })
}


//fazer detalhes da garagem

//ainda nao esta a funcionar
const getestacionamentobyid = (request, response) => {
  const est = request.body
  console.log(est)
  const query = "INSERT INTO estacionamento (estacionamento_id) VALUES ('" + est.estacionamento_id.toString() +"')";
  console.log(query)
  client.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send("Estacionamento added with ID: ")
  })
}


const createestacionamento = (request, response) => {
  const est = request.body
  console.log(est)
  const query = "INSERT INTO estacionamento (estacionamento_nome, estacionemento_morada, estacionamento_preco,coordenadas) VALUES ('" + est.nome.toString()+ est.morada.toString()+ est.preco.toString()+ est.coordenadas.toString() +"',1)";
  console.log(query)
  client.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send("Estacionamento added with ID: ")
  })
}

//delete de garagem
const estdelete = (request, response) => {
  const est = request.body

  const query1 = "SELECT !ISNULL((SELECT ISNULL(estacionamento_id) FROM onspot.estacionamento where estacionamento_nome='" + est.nome.toString() + "' and estacionamento_morada = '" + est.morada.toString() + "'))as existe";
  const del = "DELETE FROM onspot.reserva where utilizador_nome= '" + est.nome.toString() + "'"; //DUVIDAS DE COMO ALTERAR ESTA QUERY
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
        if((est.entrada==est.entrada)) {

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

  getestacionamento,
  createestacionamento,
  getestacionamentobyid,
  estdelete


}