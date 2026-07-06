import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DateTimePicker as MuiDateTimePicker,
  type DateTimePickerProps as MuiDateTimePickerProps
} from '@mui/x-date-pickers/DateTimePicker';
import React from 'react';

const DateTimePicker = React.forwardRef<HTMLDivElement, MuiDateTimePickerProps>(
  (props, ref) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MuiDateTimePicker {...props} ref={ref} />
      </LocalizationProvider>
    );
  }
);

export default DateTimePicker;
