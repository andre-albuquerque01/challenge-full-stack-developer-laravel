import { InsertStudentComponent } from '@/components/student/insert/InsertStudentComponent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Insert student',
  },
}

export default function InsertStudent() {
  return (
    <div className="flex justify-center items-center">
      <InsertStudentComponent />
    </div>
  )
}
