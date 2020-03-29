const express = require('express');

const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

/**
 * tipos de parametros
 * 
 * query params:parametros nomeados enviados na rota apos "?"(filtros paginação),(name,idade)
 * route parms:paramentros utilizados para identificar recursos(id)
 * request body:corpo da requisição,utilizado para criar ou alterar recursos
 */



app.listen(3333);
