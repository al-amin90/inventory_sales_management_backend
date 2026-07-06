import { TAcademicSemesterNameCodeMapped } from './academicSemester.interface'

export const AcademicSemesterName = ['Autumn', 'Summer', 'Fall'] as const
export const AcademicSemesterCode = ['01', '02', '03'] as const
export const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const
export const academicSemesterNameCodeMapped: TAcademicSemesterNameCodeMapped = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
