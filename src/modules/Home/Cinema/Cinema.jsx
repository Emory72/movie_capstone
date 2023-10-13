import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Address from "./Address";
import CinemaShowTimes from "./CinemaShowTimes";
// Set up MUI Atb vertical
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, TabList } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

//Set up Logo
import { getMovieSystem } from "../../../apis/cinemaAPI";
//set up Address
import { getMovieAddress } from "../../../apis/cinemaAPI";
//set up movie Details
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
        <Box sx={{ p: 3 }}>
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

  //useQuery to fetcher data for movie times data
  const { data: movieDetailsData } = useQuery({
    queryKey: ["MovieDetails", systemID],
    queryFn: () => getMovieDetails(systemID),
    refetchOnWindowFocus: false,
  });
  console.log(movieDetailsData);

  // const [theaterID, setTheaterID] = useState([]);
  // // const theaterSystems = movieDetailsData?.lstCumRap || [];

  // const handleGetDetails = () => {
  //   const found = logoData?.find((item) => item.maHeThongRap === systemID);
  //   console.log(found);
  // };

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
                    className="my-1"
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
          <TabPanel value={value} index={index}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              {addressData?.map((cinemas, index) => (
                <Tab
                  // onClick={() => handleGetDetails()}
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
          </TabPanel>
        ))}
      </Box>
    </div>
  );
}
