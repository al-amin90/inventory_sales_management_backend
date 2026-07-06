import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { UserModel } from './user.model'

const findLastStudentId = async (semesterYearCode: string) => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
      id: { $regex: new RegExp(`^${semesterYearCode}`) },
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
  const { code, year } = payload

  const currentId =
    (await findLastStudentId(`${year}${code}`)) || (0).toString()

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

  return `${payload.year}${payload.code}${incrementId}`
}

export const generateFacultyId = async () => {
  const lastFaculty = await UserModel.findOne({
    role: 'faculty',
    id: { $regex: new RegExp(`^F-`) },
  })
    .sort({ createdAt: -1 })
    .select('id')
    .lean()

  const lastIdNumber = lastFaculty ? Number(lastFaculty.id.split('-')[1]) : 0
  const nextId = (lastIdNumber + 1).toString().padStart(4, '0')

  return `F-${nextId}`
}

export const generateAdminId = async () => {
  const lastFaculty = await UserModel.findOne({
    role: 'admin',
  })
    .sort({ createdAt: -1 })
    .select('id')
    .lean()

  const lastIdNumber = lastFaculty ? Number(lastFaculty.id.split('-')[1]) : 0
  const nextId = (lastIdNumber + 1).toString().padStart(4, '0')

  return `A-${nextId}`
}
