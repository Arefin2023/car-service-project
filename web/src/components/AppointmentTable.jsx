import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "./RowCellStyle";

export function AppointmentTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Customer Name</StyledTableCell>
            <StyledTableCell align="right">Car Number</StyledTableCell>
            <StyledTableCell align="right">Service Type</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.customer}>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.customer}</StyledTableCell>
              <StyledTableCell align="right">{row.car}</StyledTableCell>
              <StyledTableCell align="right">{row.service}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
