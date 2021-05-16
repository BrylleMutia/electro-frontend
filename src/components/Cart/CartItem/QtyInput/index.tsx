import React from 'react'


interface Props {
  value: number
}

const QtyInput: React.FC<Props> = ({ value }) => {
  return (
    <div>
      {value}
    </div>
  )
}

export default QtyInput
