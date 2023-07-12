import React, { useEffect, useState } from "react";
import { Modal, Box, Grid, Tabs, Tab, Slider } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import "./index.css";

const CustomModal = ({ handleClose, open, data }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const joinArray = (array) => {
    const result = array
      ?.map((word, index) => {
        if (index !== array.length - 1) {
          return word.type.name + ",";
        }
        return word.type.name;
      })
      .join(" ");
    return result;
  };

  useEffect(() => {}, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%", // Mengatur lebar modal secara responsif
          maxWidth: "500px",
          overflow: "scroll",
          bgcolor: "#556cd6",
          boxShadow: 24,
          borderRadius: "10px",
          outline: "none",
        }}
      >
        <Grid
          container
          flexDirection={"column"}
          style={{
            backgroundColor: "#556cd6",
            borderRadius: "15px",
          }}
        >
          <Grid item style={{ margin: "15px 0 5px 15px" }}>
            <ArrowBackIos
              onClick={handleClose}
              style={{ cursor: "pointer", color: "#FFF" }}
            />
          </Grid>
          <Grid item style={{ position: "relative" }}>
            <div className="wrapper-header">
              <div className="wrapper-title">{data?.name}</div>
              <div className="image-detail">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`}
                  width={230}
                  alt={`pokemon-${data?.id}`}
                />
              </div>
            </div>
            <div className="wrapper-detail">
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                variant="fullWidth"
              >
                <Tab label="About" />
                <Tab label="Base Stats" />
              </Tabs>
              {activeTab === 0 && (
                <div className="tab-content">
                  <Grid container flexDirection={"row"} margin={2}>
                    <Grid item xs={4}>
                      <span style={{ fontWeight: "bold", color: "GrayText" }}>
                        Species
                      </span>
                    </Grid>
                    <Grid item xs={8}>
                      <span>{data?.species?.name}</span>
                    </Grid>
                  </Grid>
                  <Grid container flexDirection={"row"} margin={2}>
                    <Grid item xs={4}>
                      <span style={{ fontWeight: "bold", color: "GrayText" }}>
                        Height
                      </span>
                    </Grid>
                    <Grid item xs={8}>
                      <span>{`${data?.height * 10} cm`}</span>
                    </Grid>
                  </Grid>
                  <Grid container flexDirection={"row"} margin={2}>
                    <Grid item xs={4}>
                      <span style={{ fontWeight: "bold", color: "GrayText" }}>
                        Weight
                      </span>
                    </Grid>
                    <Grid item xs={8}>
                      <span>{`${data?.height / 10} kg`}</span>
                    </Grid>
                  </Grid>
                  <Grid container flexDirection={"row"} margin={2}>
                    <Grid item xs={4}>
                      <span style={{ fontWeight: "bold", color: "GrayText" }}>
                        Abilities
                      </span>
                    </Grid>
                    <Grid item xs={8}>
                      <span>{joinArray(data?.types)}</span>
                    </Grid>
                  </Grid>
                </div>
              )}
              {activeTab === 1 && (
                <div className="tab-content">
                  {data?.stats?.map((d, i) => {
                    console.log(d, i);
                    return (
                      <Grid container flexDirection={"row"} margin={2}>
                        <Grid item xs={3}>
                          <span
                            style={{ fontWeight: "bold", color: "GrayText" }}
                          >
                            {d.stat.name}
                          </span>
                        </Grid>
                        <Grid item xs={2}>
                          <span>{d?.base_stat}</span>
                        </Grid>
                        <Grid item xs={7}>
                          <Slider
                            max={100}
                            defaultValue={d?.base_stat}
                            aria-label="Default"
                            valueLabelDisplay="off"
                            style={{ width: "85%" }}
                            disabled
                          />
                        </Grid>
                      </Grid>
                    );
                  })}
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CustomModal;
