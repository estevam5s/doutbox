## 2 Nodejs
# 2.1 Perguntas Técnicas
2.1.1 O que é NPM e sua aplicação dentro do projeto?
O NPM é um gerenciador de pacotes do node, o que significa que, ele vai fazer toda a parte de gerencimento e instalações de pacotes para cada um tem o seu papel desempenhado

2.1.2 Quais as principais bibliotecas JavaScript que você já trabalhou?
Express, prisma, jsonwebtoken, ts-node & nodemon

2.1.3 Qual a funcionalidade do express?
Express é um framework javascript. O que siginifica que,
ele vai integrar diretamento com o server-side atuando como uma API, pode utilizar com o super set do JS, e facilita muito a criação de app utilizando Nodejs e JavaScript 

2.1.4 O que você entende como rotas da aplicação?
Rotas entende-se como uma navegação e fazendo integração diretamento com express, ou seja, ela vai ficar responsável por fazer toda a parte de navegação quando for utlizar os verbos HTTP.

2.1.5 Quando é recomendado utilizar destruturação?
Serve como um meio para desempacontar um objeto, seja ele em linguagens com JS e TS, ou seja, podemos ter um código mais Clean-code, um código limpo melhor assim dizendo.
Caso queira depois utlizar essas propriedades dentro do objeto em uma requisição HTTP, utiliza o conceito de spread: ...arryValores também muito utlizado em métodos de array com forEach()
e iterações com for.
Caso queira também fazer importações de lib, terá que utilizar a sintaxe: from {} import ''; -> Isso em TS

2.1.6 Explique o funcionamento do Babel para aplicação?
Babel é um transpilado JS, o que significa que ele vai fazer toda a parte de utilizar um ECMAscript de uma versão anterior para que o browser aceite ela e não
cause erro na hora da produção

2.1.7 Porque devemos utilizar webpack para aplicações em produção?
webpack é um empacotador de pacotes, ou seja, ele pode em produção dimuir o arquivo de grande quantidade de memória para um arquivo mais rápido e performático
que no caso seria o ideal para uma aplicação.
Utilizando o comando npm run build ou com yarn -> yarn build , gera uma pasta dist estão estarão as versões de arquivos com mais performace

2.1.8 Defina Clean Architecture e sua aplicação no projeto.

2.1.9 O que é uma API Rest?
São conjunto de boas práticas de programação utilizando o framework express do JS em conjunto com server-side utilizando o Node.js
exemplo1: Comunicação de dados utilizando express e node
exemplo2: Utiliza-se em sua grande parte em aplicações express os verbos em requisições HTTP como o GET, PUT, DELETE, POST entre outras mais
