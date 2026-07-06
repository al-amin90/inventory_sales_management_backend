import * as z from 'zod'
import { BloodGroup, Gender } from './faculty.constant'

// ---------------- User Name ----------------
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(20, 'Not more than 20 characters'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
})

// ---------------- Faculty ----------------
export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
      designation: z.string(),
      name: userNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]], {
        errorMap: () => ({
          message: "Gender must be either 'male' or 'female'",
        }),
      }),
      dateOfBirth: z.string().min(1, 'Date of birth is required'),
      email: z.string().email('Invalid email address'),
      contactNumber: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      academicDepartment: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})

export const updateFacultyValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: userNameValidationSchema.partial().optional(),
        gender: z.enum(['male', 'female']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNumber: z.string().optional(),
        avatar: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        academicDepartment: z.string().optional(),
        profileImg: z.string().optional(),
      })
      .optional(),
  }),
})
