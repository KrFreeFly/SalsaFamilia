import { PassTypes } from '../models/index.js';
import HttpError from '../errors/httpError.js';

export const getAllPassTypes = async () => {
  const passTypes = await PassTypes.findAll();

  if (passTypes.length === 0) {
    throw new HttpError(404, 'Типы абонементов не найдены, нужно создать хотя бы один!');
  }

  return passTypes.map((u) => u.get());
};

export const getOnePassType = async (passTypeId) => {
  const passType = await PassTypes.findOne({
    where: {
      id: passTypeId,
    },
  });
  return passType.get({ plain: true });
};

export const createPassType = async ({ type, amount, week, month, cost }) => {
  const passType = await PassTypes.create({
    type,
    amount,
    week,
    month,
    cost,
  });
  return passType.get({ plain: true });
};

export const updatePassType = async ({ passTypeId, passTypeData }) => {
  const passType = await PassTypes.update(passTypeData, {
    where: {
      id: passTypeId,
    },
  });
  return passType.get({ plain: true });
};

export const deletePassType = async (passTypeId) => {
  const passType = await PassTypes.update(
    {
      removedAt: new Date(),
    },
    {
      where: {
        id: passTypeId,
      },
    },
  );
  return passType.get({ plain: true });
};
