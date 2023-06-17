import Joi from 'joi';

const getAll = Joi.object({
  limit: Joi.number().required(),
  offset: Joi.number().required(),
  sortBy: Joi.string().required(),
});

const getBy = Joi.object({
  limit: Joi.number().required(),
  offset: Joi.number().required(),
  sortBy: Joi.string().required(),
  filterBy: Joi.string().required(),
  filterValue: Joi.string().required(),
});

const getById = Joi.object({
  id: Joi.string().required(),
});

export default { getAll, getBy, getById };
