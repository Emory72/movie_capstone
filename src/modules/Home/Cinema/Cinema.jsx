import React, { useState, useEffect } from "react";

// Set up MUI Atb vertical
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, TabList } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

//Set up Logo
import { getMovieSystem } from "../../../apis/cinemaAPI";
//set up Address
import { getMovieAddress } from "../../../apis/cinemaAPI";
//set up movieDetails
import { getMovieDetails } from "../../../apis/cinemaAPI";

//function of MUI  Tab vertical
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Cinema() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // useQuery to fetcher data for Logo data
  const { data: logoData = [], isLoading } = useQuery({
    queryKey: ["getMovieSystem"],
    queryFn: getMovieSystem,
    refetchOnWindowFocus: false,
  });

  const [systemID, setSystemID] = useState([]);
  const handleGetAddress = (systemID) => {
    setSystemID(systemID);
  };

  //useQuery to fetcher data for movie address data
  const { data: addressData } = useQuery({
    queryKey: ["MovieAddress", systemID],
    queryFn: () => getMovieAddress(systemID),
    enabled: !!systemID,
    refetchOnWindowFocus: false,
  });
  console.log(addressData);
  //useQuery to fetcher data for movie details data
  const { data: movieDetailsData } = useQuery({
    queryKey: ["MovieDetails"],
    queryFn: getMovieDetails,
    refetchOnWindowFocus: false,
  });
  console.log(movieDetailsData);
  const [theaterID, setTheaterID] = useState([]);

  const theaterSystem = movieDetailsData?.lstCumRap || [];
  const handleGetDetails = (theaterID) => {
    const found = theaterSystem.find((item) => item.maCumRap == theaterID);

    // const onplayMovies = movieDetailsData?.filter((movie) => {
    //   return movie.dangChieu === true;
    // });
    setTheaterID(found);
  };
  console.log(theaterSystem);

  return (
    <div className="container my-5">
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 650,
          borderRadius: 5,
        }}
      >
        {/* Tabs 1 cho cột Logo */}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {logoData?.map((system, index) => (
            <Tab
              key={system.maHeThongRap}
              {...a11yProps(index)}
              label={
                <div onClick={() => handleGetAddress(system.maHeThongRap)}>
                  <img
                    className="my-1 p-2"
                    width={100}
                    height={100}
                    src={system.logo}
                    alt=""
                  />{" "}
                </div>
              }
            />
          ))}
        </Tabs>

        {addressData?.map((cinemas, index) => (
          <TabPanel className="overflow-scroll" value={value} index={index}>
            {/* Tab */}
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
            >
              {addressData?.map((cinemas, index) => (
                <Tab
                  onClick={() => handleGetDetails(cinemas.maCumRap)}
                  key={cinemas.maCumRap}
                  label={
                    <div className="text-align-start">
                      <h5 className="text-success">{cinemas.tenCumRap}</h5>
                      <p>{cinemas.diaChi}</p>
                      <a href="/" className="text-danger">
                        [Chi Tiết]
                      </a>
                    </div>
                  }
                />
              ))}
            </Tabs>

            {movieDetailsData.lstCumRap?.map((movies, index) => {
              <TabPanel className="overflow-scroll" value={value} index={index}>
                {movies.danhSachPhim.map((movie) => {
                  <div className="row">
                    <div className="col-2">
                      <img src={movies.hinhAnh} alt="" />
                    </div>
                    <div className="col">
                      <button>C18</button>
                      <span>{movies.tenPhim}</span>
                    </div>
                  </div>;
                })}
              </TabPanel>;
            })}
          </TabPanel>
        ))}
      </Box>
    </div>
  );
}
