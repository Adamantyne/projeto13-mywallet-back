import joi from 'joi';

const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const signInSchema = joi.object({
    email: joi.string().required().pattern(validEmail),
    password: joi.string().required()
});
export const signOnSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().pattern(validEmail),
    password: joi.string().required(),
    repeatPassword: joi.string().required()
});
