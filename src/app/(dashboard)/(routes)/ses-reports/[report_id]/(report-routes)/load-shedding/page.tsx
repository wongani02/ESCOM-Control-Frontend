import React from 'react'

const Page = ({ params }: { params: { report_id: number } }) => {
  return (
    <div>
      load shedding {params.report_id}
    </div>
  )
}

export default Page
