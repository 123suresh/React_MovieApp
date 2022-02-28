import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommonButton from "../common/CommonButton";
import InputField from "../common/InputField";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { auth } from "../../action/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core";
//for translation
import { useTranslation } from "react-i18next";
import { handleChangeLanguage } from "../../action/movie";
import SelectTextFields from "../common/Select";
import i18n from "../../i18n";

const useStyles = makeStyles((theme) => ({
  inputFieldErr: {
    color: "red",
    marginTop: "-8px",
    marginLeft: "10px",
  },
  login__button: {
    textAlign: "center",
    marginLeft: "15px",
  },
  login__main: {
    width: "380px",
    margin: "auto",
    marginTop: "40px",
    boxSizing: "border-box",
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    height: "320px",
    backgroundColor: "#F0FFFF",
    [theme.breakpoints.down("xs")]: {
      width: "320px",
    },
  },
  validation__text: {
    color: "red",
    textAlign: "center",
  },
  login__box: {
    padding: "10px",
    // backgroundColor: "white",
  },
  login__header: {
    textAlign: "center",
    marginTop: "12px",
  },
  login__label: {
    marginRight: "20px",
  },
}));

function Login() {
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const selectedLanguage = useSelector((state) => state.info.selectLanguage);
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      if (
        values.email === "admin@gmail.com" &&
        values.password === "admin123"
      ) {
        const tokenValue = process.env.REACT_APP_TOKEN;
        dispatch(auth(tokenValue));
      } else {
        setErr(true);
      }
    },
  });

  //for translation
  const { t, i18n } = useTranslation();

  if (isAuthenticated) return <Navigate to="/movieList" />;
  return (
    <div>
      <SelectTextFields selectLabel={t("selectLang")} />
      <div className={classes.login__main}>
        <div className={classes.login__box}>
          <div className={classes.login__header}>
            <Typography variant="h5">{t("login")}</Typography>
          </div>
          <div className={classes.login__label}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <InputField
                label={t("email")}
                type="text"
                error={
                  formik.touched.email && formik.errors.email ? true : null
                }
                id="email"
                name="email"
                value={formik.values.email}
                onChange={(e) => {
                  setErr(false);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null
                }
              />
              <InputField
                label={t("password")}
                type="password"
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : null
                }
                id="password"
                name="password"
                value={formik.values.password}
                onChange={(e) => {
                  setErr(false);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null
                }
              />
              <div className={classes.login__button}>
                <CommonButton type="submit" buttonName={t("login")} fullWidth />
                <hr />
                <CommonButton buttonName={t("newAccount")} color="success" />
              </div>
              <div className={classes.validation__text}>
                {err ? <p>Invalid Email or Password</p> : null}
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
