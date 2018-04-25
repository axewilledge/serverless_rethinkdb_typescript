# serverless_rethinkdb_typescript
GET, POST, PUT and DELETE methods for rethinkDB in typescript using serverless

First setup rethinkDB in your machine
https://www.rethinkdb.com/docs/install/

Run - <b> npm install </b>

Using administrator command promt run - <b> serverless offline start </b>
To run the server

You can use the services in - <b> http://localhost:3000/offers </b> (GET,POST,PUT,DELETE)

Accepeted json format is - 
<pre><b>
{
   "duration": "3 Day",
   "offers" : [{"Bank offer":"Free"},{"School offer": "Free"}]
}
</b></pre>

