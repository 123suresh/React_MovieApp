import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import i18n from "../../i18n";

const languages = [
  {
    value: "english",
    label: "English",
  },
  {
    value: "hindi",
    label: "Hindi",
  },
  {
    value: "germany",
    label: "Germany",
  },
  {
    value: "chinese",
    label: "Chinese",
  },
];

export default function SelectTextFields() {
  const [language, setLanguage] = React.useState("english");

  const dispatch = useDispatch();

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "15ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="standard-select-currency-native"
          select
          label="Select Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          SelectProps={{
            native: true,
          }}
          variant="standard"
        >
          {languages.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
