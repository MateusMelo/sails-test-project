# Sails Test Project

## Rodar o projeto

Será necessário baixar as depêndencias (registradas no `package.json`) digitando:

    npm install


## Dump

**Database:** sails-test-project

Comando utilizado para exportar:

    mongodump --db sails-test-project

Comando utilizado para importar:

    mongorestore --db sails-test-project /path/to/project/dumps/sails-test-project/user.bson


## Acessar o projeto

`/admin` para área administrativa

**Email:** oadministrador@example.com / **Password:** q1w2e3r4


## Emails

Está sendo utilizado o servidor de SMTP do Gmail para envio dos emails, com uma conta ficticia que pode ser encontrada no arquivo de configuração `config/email.js`.


