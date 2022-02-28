import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMovieList } from "../../action/movie";
import MovieCard from "../common/MovieCard";
import { Link } from "react-router-dom";
import InputField from "../common/InputField";
import { search } from "../../utils/search";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Container, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
  },
  cardStyle: {
    // marginLeft: "78px",
    boxSizing: "border-box",
  },
  paper: {
    alignItems: "center",
    // marginLeft: "50px",
    // marginRight: "50px",
  },
}));

function MovieList() {
  const classes = useStyles();
  const allMovies = useSelector((state) => state.info.movieList);
  let dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(loadMovieList());
  }, []);

  const movieAfterSearching = () => {
    if (searchTerm === "") {
      return allMovies;
    } else {
      const ignoreSpaceSearchTerm = searchTerm.replace(/ +/g, "");
      const searchedMovie = search(allMovies, ignoreSpaceSearchTerm);
      return searchedMovie;
    }
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h4" className={classes.title}>
          Movies
        </Typography>
        <Typography>
          <InputField
            label="Search....."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Typography>
      </Box>
      <div>
        <Grid
          container
          rowSpacing={2}
          sx={{
            justifyContent: "space-between",
          }}
        >
          {movieAfterSearching().length !== 0 ? (
            <>
              {movieAfterSearching().map(({ id, src }) => (
                <React.Fragment key={id}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{ padding: "32px" }}
                  >
                    <div className={classes.cardStyle}>
                      <Link to={`/movie/${id}`}>
                        <MovieCard
                          imgSrc={src}
                          width="250"
                          height="350"
                          id={id}
                        />
                      </Link>
                    </div>
                  </Grid>
                </React.Fragment>
              ))}
            </>
          ) : (
            <Typography variant="h4" align="center" color="textSecondary">
              No Matching Result found
            </Typography>
          )}
        </Grid>
      </div>
    </Container>
  );
}

export default MovieList;
