import { Clients } from '../models/index.js'

//POST
export const createNewClient = async (req, res) => {

};

//GET
export const getAllClients = async (req, res) => {
    try {
        const { rows, count } = await Clients.findAndCountAll({
            order: [['surname', 'ASC'], ['name', 'ASC']],
        });
        const items = rows.map((u) => u.get())
        const result = {
            items: items,
            total: count,
        }
        res.status(200).json(result);

    } catch(err) {
        console.log(err);
        res.status(500).send('Error ocсured');
    }
};

//PUT
export const updateClient = async (req, res) => {

}

//DELETE
export const deleteClient = async (req, res) => {

}