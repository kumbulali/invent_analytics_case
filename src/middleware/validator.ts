import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema, ValidationError } from "joi";

export const ValidateBody = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(422).json({
        message: `An error occured. ${(error as ValidationError).message}`,
      });
    }
  };
};

export const ValidateParams = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.params);
      next();
    } catch (error) {
      return res.status(422).json({
        message: `An error occured. ${(error as ValidationError).message}`,
      });
    }
  };
};

export const Schemas = {
  createUserSchema: Joi.object({
    name: Joi.string().min(3).max(30).required(),
  }),
  createBookSchema: Joi.object({
    name: Joi.string().min(3).max(100).required(),
  }),
  returnBookSchema: Joi.object({
    score: Joi.number().integer().min(0).max(10).required(),
  }),
  urlParamsSchema: Joi.object({
    id: Joi.number().integer().optional(),
  }),
  urlParamsForBorrowSchema: Joi.object({
    userId: Joi.number().integer().required(),
    bookId: Joi.number().integer().required(),
  }),
};
