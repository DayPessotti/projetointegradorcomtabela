import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { Box } from "@mui/material";

dayjs.locale("pt-br");

export default function InputData({ value, setValue }) {
  return (
    <Box sx={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
          <DatePicker
            sx={{ width: "100%" }}
            label="Dia"
            format="D/MM/YYYY"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
