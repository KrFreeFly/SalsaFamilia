import jwt from "jsonwebtoken";

export const authMidWare = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            res.status(401).render('login')
            return
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.username
        next()
    } catch (err) {
        res.status(500).send({msg: 'Internal server error'})
    }
};