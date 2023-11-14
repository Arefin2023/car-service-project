import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "./RowCellStyle";

export function WipTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Job ID</StyledTableCell>
            <StyledTableCell align="right">Car Number</StyledTableCell>
            <StyledTableCell align="right">Service</StyledTableCell>
            <StyledTableCell align="right">
              Estimated finish date
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.customer}>
              <StyledTableCell component="tr" scope="row">
                {row.job}
              </StyledTableCell>
              <StyledTableCell align="right">{row.car}</StyledTableCell>
              <StyledTableCell align="right">{row.service}</StyledTableCell>
              <StyledTableCell align="right">{row.efd}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
