import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableFields } from './course.constant'
import { TCourse, TCourseFaculty } from './course.interface'
import { Course, CourseFaculty } from './course.model'
import AppError from '../../errors/AppError'
import status from 'http-status'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await courseQuery.modelQuery
  return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingData } = payload
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    if (!updateBasicCourseInfo) {
      throw new AppError(status.BAD_REQUEST, 'Failed to update course')
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisite = preRequisiteCourses
        .filter(el => el.course && el.isDeleted)
        .map(el => el.course)

      if (deletedPreRequisite.length > 0) {
        await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisiteCourses: {
                course: { $in: deletedPreRequisite },
              },
            },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        )
      }

      const addPreRequisite = preRequisiteCourses
        .filter(
          el =>
            el.course &&
            mongoose.Types.ObjectId.isValid(el.course) &&
            !el.isDeleted,
        )
        .map(el => el.course)

      if (addPreRequisite.length > 0) {
        const currentCourse = await Course.findById(id).session(session)

        if (!currentCourse) {
          throw new AppError(status.BAD_REQUEST, 'Course not found')
        }

        const existingPreReqIds = currentCourse.preRequisiteCourses.map(pr =>
          pr.course.toString(),
        )

        const newPreRequisites = addPreRequisite
          .filter(courseId => !existingPreReqIds.includes(courseId.toString()))
          .map(courseId => ({
            course: courseId,
            isDeleted: false,
          }))

        if (newPreRequisites.length > 0) {
          await Course.findByIdAndUpdate(
            id,
            {
              $push: {
                preRequisiteCourses: { $each: newPreRequisites },
              },
            },
            {
              new: true,
              runValidators: true,
              session,
            },
          )
        }
      }
    }

    const result = await Course.findById(id)
      .populate('preRequisiteCourses.course')
      .session(session)

    await session.commitTransaction()
    return result
  } catch (err: any) {
    await session.abortTransaction()
    throw new Error(err)
  } finally {
    await session.endSession()
  }
}

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id)
  return result
}

const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

const assignFacultiesIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    { course: id },
    { course: id, $addToSet: { faculties: { $each: payload } } },
    {
      new: true,
      upsert: true,
    },
  )

  return result
}

const removeFacultiesFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { $pull: { faculties: { $in: payload } } },
    {
      new: true,
    },
  )

  return result
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseIntoDB,
  updateCourseIntoDB,
  assignFacultiesIntoDB,
  removeFacultiesFromDB,
}
