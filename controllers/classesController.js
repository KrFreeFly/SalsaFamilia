import path from 'path';

export const getClassesPage = function (req, res) {
    res.sendFile(path.resolve('views/classes.html'))
};