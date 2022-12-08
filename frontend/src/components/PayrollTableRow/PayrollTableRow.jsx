import React, { useState } from "react";
import { TableCell, TableRow, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useEffect } from "preact/hooks";

const PayrollTableRow = (props) => {
  const { emp, token } = props;
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [hours, setHours] = useState("");
  const [tips, setTips] = useState(0);
  const [salary, setSalary] = useState(emp.salary);
  const [userId, setUserId] = useState(emp.id);
  let totalPay;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newEntry = {
      period_start: start,
      period_end: end,
      salary: salary,
      hours_worked: hours,
      tips_received: tips,
      user_id: userId,
      total_before_taxes: totalPay,
    };
    console.log("Entry Added!", newEntry);
    await axios
      .post("http://localhost:8000/payroll/", newEntry, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(alert("Entry Added!"));
  };

  function total(empSalary, hours, tips) {
    if (hours > 80) {
      const extraHours = hours - 80;
      const overTimeRate = empSalary * 1.5;
      const overTimeTotal = extraHours * overTimeRate;
      totalPay = empSalary * 80 + overTimeTotal + parseFloat(tips);
      return "$" + totalPay;
    } else {
      totalPay = empSalary * hours + parseFloat(tips);
      return "$" + totalPay;
    }
  }

  return (
    <TableRow
      key={emp.id}
      sx={{ "&:last-child td, &:last-child th": { boreder: 0 } }}
    >
      <TableCell>
        {emp.first_name} {emp.last_name}
      </TableCell>
      <TableCell>
        <TextField
          id="period_start"
          placeholder="Start Date..."
          helperText="Start Date"
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="period_end"
          placeholder="End Date"
          helperText="End Date"
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </TableCell>
      <TableCell>{emp.salary}</TableCell>
      <TableCell>
        <TextField
          id="hours"
          label="Hours Worked"
          placeholder="Hours Worked"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="tips"
          label="Tips Received"
          placeholder="Tips Received"
          value={tips}
          onChange={(e) => setTips(e.target.value)}
        />
      </TableCell>
      <TableCell>{total(emp.salary, hours, tips)}</TableCell>
      <TableCell>
        <IconButton
          variant="contained"
          onClick={handleSubmit}
          type="submit"
          size="small"
        >
          <SaveIcon style={{ color: "orange" }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default PayrollTableRow;