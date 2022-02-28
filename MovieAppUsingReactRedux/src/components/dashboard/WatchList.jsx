import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromWatchList, loadWatchList } from "../../action/movie";
import CommonButton from "../common/CommonButton";
import MovieCard from "../common/MovieCard";
import SimpleSnackbar from "../common/SnackBar";
import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "10px",
    color: theme.palette.primary.main,
  },
}));

function WatchList() {
  const classes = useStyles();
  const watchLists = useSelector((state) => state.info.watchList);
  const dispatch = useDispatch();

  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    dispatch(loadWatchList());
  }, []);

  const handleRemove = (id) => {
    dispatch(deleteFromWatchList(id));
    setOpenSnackBar(true);
  };

  return (
    <Container maxWidth="xl">
      <Typography className={classes.title} variant="h4">
        Watch List
      </Typography>
      <Grid container spacing={4}>
        {watchLists.map(({ src, title, id }) => (
          <Grid item sx={{ padding: "20px" }} lg={3} key={id}>
            <Paper
              elevation={24}
              sx={{
                padding: "10px",
                alignItems: "center",
                marginLeft: "4rem",
              }}
            >
              <MovieCard imgSrc={src} width="200" height="300" />
              <Box>
                <Typography variant="h5" color="textSecondary">
                  {title}
                </Typography>
                <CommonButton
                  buttonName="remove"
                  size="small"
                  color="error"
                  onClick={() => handleRemove(id)}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {openSnackBar ? (
        <SimpleSnackbar
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
          msg="Removed Sucessfully"
        />
      ) : (
        ""
      )}
    </Container>
  );
}

export default WatchList;
