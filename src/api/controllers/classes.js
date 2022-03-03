import { Clients } from '../../../models/index.js'
import { transformData } from "../../../public/javascripts/functions.js";

//POST
export const createNewClass = async (req, res) => {

};

//GET
export const getAllClasses = async (req, res) => {
    try {
        let clients = await Clients.findAll({
            order: [['surname', 'ASC'], ['name', 'ASC']],
        });
        clients = transformData(clients);
        res.json(clients);
    } catch(err) {
        console.log(err);
        res.status(500).send('Error ocсured');
    }
};

//PUT
export const updateClass = async (req, res) => {

}

//DELETE
export const deleteClass = async (req, res) => {

}