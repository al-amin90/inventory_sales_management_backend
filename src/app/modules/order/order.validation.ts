import z from 'zod'

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
      required_error: 'Faculty is Required ',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Name must be string',
      required_error: 'Faculty is Required ',
    }),
  }),
})

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string',
        required_error: 'Faculty is Required ',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Name must be string',
        required_error: 'Faculty is Required ',
      })
      .optional(),
  }),
})

export const academicDepartmentValidation = {
  academicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
}
