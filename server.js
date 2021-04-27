const { response } = require('express');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const Sequelize = require('sequelize')

/*const sequelize = new Sequelize('user', 'root', '', {
    host: 'localhost', dialect: 'mysql', port: '3308'
})
*/
const sequelize = new Sequelize('userdbfilipe2', 'filiperoot', 'rootroot', {
    host: 'db4free.net', dialect: 'mysql', port: '3306'
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json('application/json'));


app.get('/api/user/:id', (req, res) => {
    sequelize.query('select * from users where id = ' + req.params.id,
        { type: sequelize.QueryTypes.SELECT }
    ).then(user => {
        console.log("Requisição concluida")
        if (user == '') {
            res.send('Nenhum usuario encontrando')
        } else {
            res.send(JSON.stringify(user))
        }
    }).catch(error => {
        console.log(error)
        res.send(500)
    })
})

app.get('/api/user', (req, res) => {
    sequelize.query('select * from users',
        { type: sequelize.QueryTypes.SELECT }
    ).then(user => {
        console.log("Requisição concluida")
        if (user == '') {
            res.send('Nenhum usuario encontrando')
        } else {
            res.send(JSON.stringify(user))
        }
    }).catch(error => {
        console.log(error)
        res.send(500)
    })
})

app.post('/api/user/add', (req, res) => {
    sequelize.query('insert into users values(default,"' + req.body.name + '",' + req.body.idade + ')',
        { type: sequelize.create }
    ).then(user => {
        console.log("Usuario adicionado com sucesso!")
        res.send(201)
    }).catch(error => {
        console.log(error)
        res.send(500)
    })
})

app.put('/api/user/update/:id', (req, res) => {
    sequelize.query('update users set name = "' + req.body.name + '", idade = ' + req.body.idade + ' where id = ' + req.params.id,
        { type: sequelize.update }
    ).then(user => {
        console.log("Usuario atualizado com sucesso!")
        res.send(200)
    }).catch(error => {
        console.log(error)
        res.send(304)
    })
})

app.delete('/api/user/delete/:id', (req, res) => {
    sequelize.query('delete from users where id = ' + req.params.id,
        { type: sequelize.delete }
    ).then(user => {
        console.log("Usuario deletado com sucesso!")
        res.send(200)
    }).catch(error => {
        console.log(error)
        res.send(304)
    })
})


const port = process.env.PORT || 5000 
app.listen(port, function () {
    console.log('Server Up')
})