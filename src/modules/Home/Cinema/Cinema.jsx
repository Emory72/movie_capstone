import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
// Set up MUI Atb vertical
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, TabList } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  console.log(systemID);
  //useQuery to fetcher data for movie address data
  const { data: addressData = [] } = useQuery({
    queryKey: ["MovieAddress", systemID],
    queryFn: () => getMovieAddress(systemID),
    enabled: !!systemID,
    refetchOnWindowFocus: false,
  });

  console.log(addressData);

  //useQuery to fetcher data for movie details data
  // const { data: movieDetailsData } = useQuery({
  //   queryKey: ["MovieDetails"],
  //   queryFn: getMovieDetails,
  //   refetchOnWindowFocus: false,
  // });
  // console.log(movieDetailsData);

  useEffect(() => {
    if (logoData.length > 0) {
      handleGetAddress(logoData[0].maHeThongRap);
    }
  }, [logoData]);

  const [movieDetailsData, setMovieDetailsData] = useState([]);
  const [selectedTenCumRap, setSelectedTenCumRap] = useState(0);
  const handleGetDetails = async (infoTheaterId, tenCumRap) => {
    try {
      const movieDetailsData = await getMovieDetails(infoTheaterId);
      setMovieDetailsData(movieDetailsData);
      setSelectedTenCumRap(tenCumRap);
    } catch (error) {
      console.log(error);
    }
  };

  // if (!movieDetailsData) {
  //   return;
  // }

  // const filterMovies = movieDetailsData.lstCumRap.danhSachPhim.filter(
  //   (movie) => {
  //     return movie.dangChieu === true;
  //   }
  // );
  // console.log(filterMovies);

  // useEffect(() => {
  //   if (addressData.length > 0) {
  //     handleGetDetails(addressData[0].tenCumRap);
  //   }
  // });
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

        {addressData?.map((data, index) => (
          // phan map nay a chua hieu lam
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
                      <h5 className="text-success">{cinemas?.tenCumRap}</h5>
                      <p>{cinemas?.diaChi}</p>
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
        <Box sx={{ width: 1000 }} className="overflow-scroll">
          {movieDetailsData?.map((detailData, index) =>
            detailData.lstCumRap.map((data) =>
              data.danhSachPhim.map((dt) => (
                <div className="row py-3">
                  <div className="col-2 mx-3 me-5">
                    <img
                      className="rounded"
                      src={dt.hinhAnh}
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="col ">
                    <h4>{dt.tenPhim}</h4>
                    {dt.lstLichChieuTheoPhim.map((d) => (
                      <button
                        onClick={() => navigate(`/ticket/${d.maLichChieu}`)}
                        className="btn btn-light py-2 mx-2 my-2 border"
                      >
                        {dayjs(d.ngayChieuGioChieu).format("DD/MM/YYYY ~HH:mm")}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )
          )}
        </Box>
      </Box>
    </div>
  );
}
