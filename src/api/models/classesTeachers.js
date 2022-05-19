import sequelize from "../boot/db.js";
import { Sequelize } from 'sequelize';
import { Classes } from "./classes.js";
import { Teachers } from "./teachers.js";

const ClassesTeachers = sequelize.define(
    'classesTeachers',
    {
        classId: {
            type: Sequelize.INTEGER,
            field: 'class_id',
            references: {
                model: Classes,
                key: 'id',
            },
        },
        teacherId: {
            type: Sequelize.INTEGER,
            field: 'client_id',
            references: {
                model: Teachers,
                key: 'id',
            },
        },
    },
    {
        tableName: 'classes_teachers',
        timestamps: false,
    },
);

ClassesTeachers.removeAttribute('id');

export { ClassesTeachers };