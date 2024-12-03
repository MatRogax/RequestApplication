# API Request Application

Esta aplicação permite que você envie requisições para uma API e visualize as respostas.

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/en/) (versão 12 ou superior)
- [npm](https://www.npmjs.com/) (geralmente incluído com o Node.js)

## Instalação

1. Clone o repositório para a sua máquina local:

   `npm install`

2. Rode o comando para trazer o ambiente de dados com docker
   
     `docker compose up -d`

4. Utilize o comando do prisma para popular os dados no banco
   
     `npx prisma db seed`
   
5. Visualizaçao dos dados populados
   
   `npx prisma studio`
   
6. Utilizando o comando abaixo para rodar o backend e frontend juntos para teste

   `npm start`
  

