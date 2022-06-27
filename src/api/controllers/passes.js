import { Passes } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllPasses = async () => {
  const passes = await Passes.findAll({
    where: {
      classesLeft: {
        [Op.ne]: 0,
      },
      removedAt: null,
    },
  });
  return passes.map((u) => u.get());
};

export const getOnePass = async (passId) => {
  const pass = await Passes.findOne({
    where: {
      id: passId,
    },
  });
  return pass.get({ plain: true });
};

export const createPass = async ({
  clientId,
  passTypeId,
  startDate,
  endDate,
  classesLeft,
  cost,
}) => {
  const pass = await Passes.create({
    clientId,
    passTypeId,
    startDate,
    endDate,
    classesLeft,
    cost,
  });
  return pass.get({ plain: true });
};

export const updatePass = async ({ passId, passData }) => {
  const pass = await Passes.update({ passData }, { where: passId });
  return pass.get({ plain: true });
};

export const deletePass = async (passId) => {
  const pass = await Passes.update({ removedAt: new Date() }, { where: { id: passId } });
  return pass.get({ plain: true });
};
