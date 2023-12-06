import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import React from 'react'
import { DateRange, type Range, type RangeKeyDict } from 'react-date-range'

type CalendarProps = {
  value: Range
  disabledDates?: Date[]
  onChange: (value: RangeKeyDict) => void
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  disabledDates,
  onChange,
}) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      onChange={onChange}
    />
  )
}

export default Calendar
