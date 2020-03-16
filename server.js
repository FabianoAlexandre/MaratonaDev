/*const cor = "branco"
const tamanho = 2.5

function  verificaCopo() {
    return "Copo esta limpo"
}

const copo = {
    cor,
    tamanho,
    verificaCopo,
}

console.log(copo)
*/
//Configurando o servidor.
const express = require("express")
const server = express()

//Configurar o servidor para acessar arquivos staticos
server.use(express.static('public'))

//Habilitar o body do formulario
server.use(express.urlencoded({extended: true}))

//configurando conexao com BD
const Pool = require('pg').Pool
const db = new Pool({
  user: 'postgres',
  password: 'Alun0F@tec',
  host: 'localhost',
  port: 5432,
  database: 'Doe'
})

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true //Desabilitar o cache
})

/*const donors = [
    { name: 'Fabiano Alexandre',
      blood: 'O+'  
    },
    { name: 'João da Silva Nunes',
      blood: 'A+'  
    },
    { name: 'Ruan Vicioli',
      blood: 'O+'  
    },
    { name: 'Laura Vicioli Alexandre',
      blood: 'O+'  
    }
]
*/
//Configurando apresentação da pagina
server.get("/", function(req, res){

  db.query("Select * From donors",function(err, result){
    if(err) return res.send("Erro de banco de dados.")

    const donors = result.rows;
    return res.render("index.html", {donors})
  })

  
})

server.post("/", function(req, res){
//pegar os dados do formulario
 const name = req.body.name
 const email = req.body.email
 const blood = req.body.blood

  //Condicional para verificar se os campos então vazios
  if(name == "" || email == "" || blood == ""){
    return res.send("Todos os campos são obrigatorios.")
  }

 //Colocando valores no BD
 const query = `
 Insert Into donors ("name", "email","blood")
 Values($1, $2, $3)`

 const values = [name, email, blood]

db.query (query, values, function(err){

  if (err) return res.send("Erro no banco de dados.")

 /*Inserindo dados no array Donors.
 donors.push({
   name: name,
   blood: blood,
})
*/

  return res.redirect("/")

}) 

})
//Liganddo o servidor e permitindo acesso a porta 3000
server.listen(3000, function(){
    console.log("Iniciei o servidor.")
})
