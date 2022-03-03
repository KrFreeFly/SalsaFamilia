import express from 'express';

const router = express.Router();

router.post('/loginRouter/password', (req, res) => {
    res.end
});

router.get('/logout', function (req, res) {
    res.redirect('/');
});

export default router;