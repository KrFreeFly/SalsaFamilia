const jwt = require('jsonwebtoken')


const authMidWare = async (req,res,next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.render('login', {
            msg: 'Необходима авторизация'
        })
        return
    }

    try {
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const username = decoded.username
        req.user = username
    } catch {
        res.render('login',{
            msg: 'Авторизация истекла'
        })
    }
    next()
}

module.exports = authMidWare