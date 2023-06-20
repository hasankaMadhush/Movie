var Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const create = Joi.object({
  name: Joi.string().required(),
  createdBy: Joi.objectId().required(),
  movies: Joi.array().items(Joi.objectId),
});

export default { create };
