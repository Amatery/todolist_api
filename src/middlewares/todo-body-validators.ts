import { body } from 'express-validator'
import { errorMessages } from '../helpers/error-messages'

export const validateTitle = body('title')
  .exists()
  .withMessage(errorMessages.requiredField)
  .isString()
  .withMessage(errorMessages.invalidType)
  .trim()
  .isLength({
    min: 5,
    max: 50,
  })
  .withMessage(errorMessages.incorrectLength('Title', 5, 50))

export const validateDescription = body('description')
  .exists()
  .withMessage(errorMessages.requiredField)
  .isString()
  .withMessage(errorMessages.invalidType)
  .trim()
  .isLength({
    min: 5,
    max: 100,
  })
  .withMessage(errorMessages.incorrectLength('Description', 5, 100))
