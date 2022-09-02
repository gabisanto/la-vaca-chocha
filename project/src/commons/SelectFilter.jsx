import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SelectFilter({ stateChanger, label }) {
  let products = useSelector((state) => state.products);
  let prods = products.slice();
  const [choice, setChoice] = useState("Por defecto");

  useEffect(() => {
    stateChanger(products);
  }, [products]);

  useEffect(() => {
    switch (choice) {
      case "Por defecto":
        stateChanger(prods);

        break;
      case "Precio ascendente":
        stateChanger(prods.sort((a, b) => a.price - b.price));

        break;
      case "Precio descendente":
        stateChanger(prods.sort((a, b) => b.price - a.price));

        break;
      default:
        stateChanger(prods);
        break;
    }
  }, [choice]);

  return (
    <Box sx={{ minWidth: 120, mt: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          sx={{
            color: "black",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#253659",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#253659",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#253659",
            },
            ".MuiSvgIcon-root ": {
              fill: "#F27457 !important",
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={choice}
          label="Ordernar por"
          onChange={(e) => setChoice(e.target.value)}
        >
          <MenuItem value={"Por defecto"}>Por defecto</MenuItem>
          <MenuItem value={"Precio ascendente"}>Precio ascendente</MenuItem>
          <MenuItem value={"Precio descendente"}>Precio descendente</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
