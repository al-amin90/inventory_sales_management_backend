import { TSchedule } from './OfferedCourse.interface'

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`)
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`)
    const currentStartTime = new Date(`1970-01-01T${newSchedule.startTime}`)
    const currentEndTime = new Date(`1970-01-01T${newSchedule.endTime}`)

    if (
      existingEndTime > currentStartTime &&
      currentEndTime > existingStartTime
    ) {
      return true
    }
  }

  return false
}
