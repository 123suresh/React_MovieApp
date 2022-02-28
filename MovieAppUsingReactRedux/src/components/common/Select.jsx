import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeLanguage } from "../../action/movie";
// import i18n from "../../i18n";

const languages = [
  {
    value: "english",
    label: "English",
  },
  {
    value: "hindi",
    label: "हिन्दी",
  },
  {
    value: "germany",
    label: "Deutsch",
  },
  {
    value: "chinese",
    label: "中国人",
  },
];

export default function SelectTextFields({ selectLabel }) {
  const [language, setLanguage] = React.useState("english");

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(handleChangeLanguage(language));
  }, [language]);

  // React.useEffect(() => {
  //   i18n.changeLanguage(language);
  // }, [language]);

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
          label={selectLabel}
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
