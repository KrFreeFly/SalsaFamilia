import sequelize from "../boot/db.js";
import { Sequelize } from 'sequelize';
import { Classes } from "./classes.js";
import { Clients } from "./clients.js";

const ClassesClients = sequelize.define(
    'classesClients',
    {
        classId: {
            type: Sequelize.INTEGER,
            field: 'class_id',
            references: {
                model: Classes,
                key: 'id',
            },
        },
         clientId: {
            type: Sequelize.INTEGER,
            field: 'client_id',
            references: {
                model: Clients,
                key: 'id',
            },
        },
    },
    {
        tableName: 'classes_clients',
        timestamps: false,
    },
);

ClassesClients.removeAttribute('id');

export { ClassesClients };