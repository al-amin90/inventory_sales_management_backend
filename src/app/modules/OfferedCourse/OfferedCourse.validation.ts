import z from 'zod'
import { Days } from './OfferedCourse.constant'

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().regex(timeRegex, {
        message: 'Start time must be in HH:MM format',
      }),
      endTime: z.string().regex(timeRegex, {
        message: 'Start time must be in HH:MM format',
      }),
    })
    .refine(data => data.startTime < data.endTime, {
      message: 'Start time must be before end time',
      path: ['endTime'],
    }),
})

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().regex(timeRegex, {
        message: 'Start time must be in HH:MM format',
      }),
      endTime: z.string().regex(timeRegex, {
        message: 'Start time must be in HH:MM format',
      }),
    })
    .refine(data => data.startTime < data.endTime, {
      message: 'Start time must be before end time',
      path: ['endTime'],
    }),
})

export const offeredCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
}
