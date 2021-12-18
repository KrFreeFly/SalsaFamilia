const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const {username, password} = req.body
    if (username === 'mike') {
        if (password === '1234') {
            const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'24h'})
            res.send({username, token})
        } else {
            console.log('wrong password')
            res.send('Wrong password')
        }
    } else {
        console.log('wrong username')
        res.send('No such user')
    }
}

module.exports = login

