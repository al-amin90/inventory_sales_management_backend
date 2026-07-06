import * as z from 'zod'

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

// ---------------- Guardian ----------------
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
})

// ---------------- Local Guardian ----------------
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  contactNo: z.string().min(1, 'Contact number is required'),
  address: z.string().min(1, 'Address is required'),
})

// ---------------- Student ----------------
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({
          message: "Gender must be either 'male' or 'female'",
        }),
      }),
      dateOfBirth: z.string().min(1, 'Date of birth is required'),
      email: z.string().email('Invalid email address'),
      contactNumber: z.string().min(1, 'Contact number is required'),
      avatar: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})

export const updateStudentValidationSchema = z.object({
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
        guardian: guardianValidationSchema.partial().optional(),
        localGuardian: localGuardianValidationSchema.partial().optional(),
        admissionSemester: z.string().optional(),
        profileImg: z.string().optional(),
      })
      .optional(),
  }),
})
