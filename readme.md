# Desafio LinkAPI

Integração entre [Pipedrive](https://www.pipedrive.com/) e [Bling!](https://www.bling.com.br/)

## Configuração Inicial

Inicialmente é necessário configurar as variáveis de ambiente no arquivo `.env` (utilize o arquivo `.env.example` como base).

##### Servidor
- `SERVER_PORT` - define a porta que a aplicação irá rodar

##### Webhook
- `WEBHOOK_URL` - url base de acesso externo para configuração do webhook. 
    - Para testes locais é possível utilizar o [ngrok](https://ngrok.com/) e inserir a url publica fornecida por ele.

**A configuração do webhook é feita de forma automática pela aplicação** com base no endereço informado nessa variável.

##### Banco de dados (Mongo)
- `MONGO_USER` - usuário do mongo
- `MONGO_PASS` - senha do usuário do mongo
- `MONGO_HOST` - host do mongo
- `MONGO_DATABASE` - database do mongo

    - Para testes possível utilizar o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

##### Bling!
- `BLING_URL` - url da api do bling
- `BLING_KEY` - chave de acesso a api do bling

##### Pipedrive
- `PIPEDRIVE_URL` - url da api do pipedrive
- `PIPEDRIVE_URL` - chave de acesso a api do pipedrive


## Documentação Base
[API Reference - Pipedrive](https://developers.pipedrive.com/docs/api/v1/)
[Pedidos API para desenvolvedores - Bling](https://ajuda.bling.com.br/hc/pt-br/articles/360046424094-GET-pedidos)
