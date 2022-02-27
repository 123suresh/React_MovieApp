import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWatchList, loadMovieList, loadWatchList } from "../../action/movie";
import CommonButton from "../common/CommonButton";
import MovieCard from "../common/MovieCard";
import ReactPlayer from "react-player";
import SimpleSnackbar from "../common/SnackBar";
import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  screenShopGap: {
    padding: "5px",
  },
  title: {
    color: "#000080",
  },
  castGap: {
    padding: "5px",
  },
  detail__button: {
    border: "none",
    backgroundColor: "none",
    fontSize: "20px",
    marginRight: "25px",
    cursor: "pointer",
  },
  detail_buttonActive: {
    color: "blue",
    textDecoration: "underline",
  },
});

function MovieDetail() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { movieId } = useParams();

  const movies = useSelector((state) => state.info.movieList);
  const watchList = useSelector((state) => state.info.watchList);
  const singleMovie = movies.filter((el) => el.id === +movieId);

  const [modeForDeatil, setModeForDetail] = useState("detail");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleDetail = () => {
    setModeForDetail("detail");
  };
  const handleCast = () => {
    setModeForDetail("cast");
  };

  useEffect(() => {
    dispatch(loadMovieList());
    dispatch(loadWatchList());
  }, []);

  const checkValueInWatchList = watchList.filter(
    (el) => el.title === singleMovie[0].title
  );

  const handleWatchList = () => {
    const title = singleMovie[0].title;
    const src = singleMovie[0].src;
    const dataToWatchList = { title, src };
    dispatch(addWatchList(dataToWatchList));
    setOpenSnackBar(true);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h4" className={classes.title}>
          Movie Details
        </Typography>
        <CommonButton
          buttonName={
            checkValueInWatchList.length === 0
              ? "add to watchlist"
              : "added to watchlist"
          }
          onClick={handleWatchList}
          disabled={checkValueInWatchList.length === 0 ? false : true}
        />
      </Box>
      <Box>
        {singleMovie.map(
          ({
            title,
            disc,
            cast1,
            cast1Name,
            cast2,
            cast2Name,
            src,
            videoUrl,
            id,
          }) => (
            <Grid container key={id} spacing={3}>
              <Grid item sm={3} xs={12}>
                <MovieCard imgSrc={src} width="300" height="400" />
              </Grid>
              <Grid item sm={9} xs={12}>
                <button
                  onClick={handleDetail}
                  className={`${classes.detail__button} ${
                    modeForDeatil === "detail"
                      ? classes.detail_buttonActive
                      : ""
                  }`}
                >
                  DETAILS
                </button>
                <button
                  onClick={handleCast}
                  className={`${classes.detail__button} ${
                    modeForDeatil === "cast" ? classes.detail_buttonActive : ""
                  }`}
                >
                  CAST
                </button>
                {modeForDeatil === "detail" ? (
                  <Box
                    sx={{
                      marginTop: "10px",
                      marginButtom: "10px",
                    }}
                  >
                    <Grid container>
                      <Grid item sm={12} md={6}>
                        <Typography variant="h4" color="primary">
                          {title}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                          Action . 2hr
                        </Typography>
                        <Typography>{disc}</Typography>
                      </Grid>
                      <Grid item sm={12} md={6}>
                        <ReactPlayer
                          controls
                          width="400px"
                          height="250px"
                          url={videoUrl}
                          className="react-player"
                        />
                      </Grid>
                    </Grid>
                    <Box component="div">
                      <Typography variant="h6">ScreenShots</Typography>
                      <Box sx={{ display: "flex", padding: "5px" }}>
                        <Typography className={classes.screenShopGap}>
                          <MovieCard imgSrc={src} width="80" height="80" />
                        </Typography>
                        <Typography className={classes.screenShopGap}>
                          <MovieCard imgSrc={src} width="80" height="80" />
                        </Typography>
                        <Typography className={classes.screenShopGap}>
                          <MovieCard imgSrc={src} width="80" height="80" />
                        </Typography>
                        <Typography className={classes.screenShopGap}>
                          <MovieCard imgSrc={src} width="80" height="80" />
                        </Typography>
                        <Typography className={classes.screenShopGap}>
                          <MovieCard imgSrc={src} width="80" height="80" />
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      padding: "20px",
                    }}
                  >
                    <Typography variant="body1" className={classes.castGap}>
                      <MovieCard imgSrc={cast1} width="80" height="80" />
                      <Typography variant="p">{cast1Name}</Typography>
                    </Typography>
                    <Typography variant="body1" className={classes.castGap}>
                      <MovieCard imgSrc={cast2} width="80" height="80" />
                      <Typography variant="p">{cast2Name}</Typography>
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          )
        )}
      </Box>
      {openSnackBar ? (
        <SimpleSnackbar
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
          msg="Added to watch list"
        />
      ) : (
        ""
      )}
    </Container>
  );
}

export default MovieDetail;
