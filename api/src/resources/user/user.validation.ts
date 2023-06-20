import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const authenticate = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default { create, authenticate };
