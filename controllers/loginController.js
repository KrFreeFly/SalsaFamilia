const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const {username, password} = req.body
    if (!username) {
        res.send('Please provide username')
        return
    }
    if (!password) {
        res.send('Please provide password')
        return
    }
    if (username === 'mike') {
        if (password === '1234') {
            const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'24h'})
            res.cookie('token', token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                secure: false,
                httpOnly: true,
            })
            res.end()
        } else {
            console.log('Wrong password')
            res.send('Wrong password')
        }
    } else {
        console.log('Wrong username')
        res.send('No such user')
    }
}

module.exports = login

