import status from 'http-status'
import AppError from '../../errors/AppError'
import { TOfferedCourse } from './OfferedCourse.interface'
import OfferedCourseModel from './OfferedCourse.model'
import SemesterRegistrationModel from '../semesterRegistration/semesterRegistration.model'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { Course } from '../Course/course.model'
import FacultyModal from '../faculty/faculty.model'
import { hasTimeConflict } from './OfferedCourse.utils'
import { RegistrationStatus } from '../semesterRegistration/semesterRegistration.constant'
import QueryBuilder from '../../builder/QueryBuilder'

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload

  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration)
  if (!isSemesterRegistrationExists) {
    throw new AppError(status.NOT_FOUND, 'Semester Registration is not Found')
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty)

  if (!isAcademicFacultyExists) {
    throw new AppError(status.NOT_FOUND, 'Academic Faculty is not Found')
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment)
  if (!isAcademicDepartmentExists) {
    throw new AppError(status.NOT_FOUND, 'Academic Department is not Found')
  }

  const isCourseExists = await Course.findById(course)
  if (!isCourseExists) {
    throw new AppError(status.NOT_FOUND, 'Course is not Found')
  }

  const isFacultyExists = await FacultyModal.findById(faculty)
  if (!isFacultyExists) {
    throw new AppError(status.NOT_FOUND, 'Faculty is not Found')
  }

  const isDepartmentBelongFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  })

  if (!isDepartmentBelongFaculty) {
    throw new AppError(
      status.BAD_REQUEST,
      `This ${isAcademicDepartmentExists?.name} Department is not belong to this ${isAcademicFacultyExists?.name} Faculty`,
    )
  }

  const isSameOfferedExistsWithSameRegister = await OfferedCourseModel.findOne({
    semesterRegistration,
    course,
    section,
  })

  if (isSameOfferedExistsWithSameRegister) {
    throw new AppError(
      status.BAD_REQUEST,
      `Offered course with same section is already exists!`,
    )
  }

  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      status.CONFLICT,
      `The Faculty not available at that time! Choose other time or day`,
    )
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  })
  return result
}

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const allOfferedCourse = new QueryBuilder(OfferedCourseModel.find(), query)
    .filter()
    .sort()
    .fields()

  const result = await allOfferedCourse.modelQuery
  return result
}

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourseModel.findById(id)
  return result
}

const updateOfferedCourseInDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload

  const isOfferedCourseExists = await OfferedCourseModel.findById(id).populate(
    'semesterRegistration',
    'status',
  )
  if (!isOfferedCourseExists) {
    throw new AppError(status.NOT_FOUND, 'Offered Course is not Found')
  }

  if (
    isOfferedCourseExists.semesterRegistration.status !==
    RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      status.NOT_FOUND,
      `Offered Course can not update! because the semester status is ${isOfferedCourseExists.semesterRegistration.status}`,
    )
  }

  const isFacultyExists = await FacultyModal.findById(faculty)
  if (!isFacultyExists) {
    throw new AppError(status.NOT_FOUND, 'Faculty is not Found')
  }

  const semesterRegistration = isOfferedCourseExists?.semesterRegistration

  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      status.CONFLICT,
      `The Faculty not available at that time! Choose other time or day`,
    )
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(
    id,
    {
      ...payload,
    },
    {
      new: true,
    },
  )
  return result
}

const deleteOfferedCourseFromDB = async (id: string) => {
  const isOfferedCourseExists = await OfferedCourseModel.findById(id).populate(
    'semesterRegistration',
    'status',
  )
  if (!isOfferedCourseExists) {
    throw new AppError(status.NOT_FOUND, 'Offered Course is not Found')
  }

  if (
    isOfferedCourseExists.semesterRegistration.status !==
    RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      status.NOT_FOUND,
      `Offered Course can not Delete! because the semester status is ${isOfferedCourseExists.semesterRegistration.status}`,
    )
  }

  const result = await OfferedCourseModel.findByIdAndDelete(id)
  return result
}

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseInDB,
  deleteOfferedCourseFromDB,
}
