import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "./RowCellStyle";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "steelblue",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

export function CustomizedTable({ rows }) {
  const rowdata = Object.keys(rows[0]);
  const rowvalue = Object.values(rows);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {rowdata.map((item) => {
              return <StyledTableCell key={item}>{item}</StyledTableCell>;
            })}
            {/* <StyledTableCell>{rowdata[0]}</StyledTableCell>
            <StyledTableCell align="right">{rowdata[1]}</StyledTableCell>
            <StyledTableCell align="right">{rowdata[2]}</StyledTableCell>
            <StyledTableCell align="right">{rowdata[3]}</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowvalue.map((row, index) => {
            return (
              <StyledTableRow key={index}>
                {rowdata.map((item) => {
                  return (
                    <StyledTableCell key={rowdata} component="td" scope="row">
                      {row[item]}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
          {/* <StyledTableCell component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell align="right">{row.customer}</StyledTableCell>
              <StyledTableCell align="right">{row.car}</StyledTableCell>
              <StyledTableCell align="right">{row.service}</StyledTableCell> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
