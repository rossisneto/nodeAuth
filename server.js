require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

app.get('/posts',(req,res)=>{
    res.json(posts.filter(post=>post.username === req.user.name))
})

app.post('/login',(req,res)=>{
    //Autenticação do usuario
    const userName = req.body.userName
    const passwd = req.body.passwd

    const user={name:userName}

    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})

})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token== null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })

}

app.listen(3000)