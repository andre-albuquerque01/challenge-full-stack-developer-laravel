import { UpdateStudentComponent } from '@/components/student/update/UpdateStudentComponent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Update student',
  },
}

export default function UpdateStudent({ params }: { params: { ra: string } }) {
  return (
    <div className="flex justify-center items-center">
      <UpdateStudentComponent ra={params.ra} />
    </div>
  )
}
