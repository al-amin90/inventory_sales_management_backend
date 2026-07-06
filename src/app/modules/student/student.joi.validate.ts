import Joi from 'joi'

// User Name Validation Schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .trim()
    .pattern(/^[A-Z][a-z]*$/)
    .messages({
      'string.pattern.base': 'First name must be capitalized (e.g., John)',
      'string.empty': 'First name is required',
      'any.required': 'First name is required',
      'string.max': 'First name cannot exceed 20 characters',
    }),
  middleName: Joi.string().allow('').optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.pattern.base': 'Last name must contain only letters',
      'string.empty': 'Last name is required',
      'any.required': 'Last name is required',
    }),
})

// Guardian Validation Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim(),
  fatherOccupation: Joi.string().required().trim(),
  fatherContactNo: Joi.string().required(),
  motherContactNo: Joi.string().required(),
})

// Local Guardian Validation Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  occupation: Joi.string().required().trim(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
})

// Main Student Validation Schema
const studentJoiValidationSchema = Joi.object({
  id: Joi.string().required().trim(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female').required(),
  dateOfBirth: Joi.string().required(),
  email: Joi.string().required().email(),
  contactNumber: Joi.string().required(),
  avatar: Joi.string().uri().allow('').optional(),
  emergencyContactNo: Joi.string().allow('').optional(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().allow('').optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': 'Status must be either active or blocked',
  }),
})

export default studentJoiValidationSchema
