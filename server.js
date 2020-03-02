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

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server
})

//Configurando apresentação da pagina
server.get("/", function(req, res){
    return res.render("index.html")
})
//Ligando o servidor e permitindo acesso a porta 3000
server.listen(3000, function(){
    console.log("Iniciei o servidor.")
})
