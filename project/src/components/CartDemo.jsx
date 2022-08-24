import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";

const TAX_RATE = 0.21;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export default function SpanningTable() {
  const rows = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addition = (acc, currentvalue) => {
    return acc + currentvalue.price * currentvalue.quantity;
  };
  const invoiceSubtotal = rows.reduce(addition, 0);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <TableContainer component={Paper} sx={{ width: "80%" }}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Desc</TableCell>
              <TableCell align="right">Cant.</TableCell>

              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flexGrow: 1,
                    }}
                  >
                    <AddIcon
                      onClick={() =>
                        dispatch({ type: "INCREASE", payload: row })
                      }
                    />
                    {row.quantity}
                    <RemoveIcon
                      onClick={() => {
                        if (row.quantity > 1) {
                          dispatch({ type: "DECREASE", payload: row });
                        } else {
                          dispatch({ type: "REMOVE", payload: row });
                        }
                      }}
                    />
                  </div>
                </TableCell>

                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    onClick={() => dispatch({ type: "REMOVE", payload: row })}
                  />
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                0
              )} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
