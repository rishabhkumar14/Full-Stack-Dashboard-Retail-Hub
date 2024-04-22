import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import bagIcon from "../assets/headers/ic_glass_bag.png";
import buyIcon from "../assets/headers/ic_glass_buy.png";
import msgIcon from "../assets/headers/ic_glass_message.png";
import userIcon from "../assets/headers/ic_glass_users.png";
import "../styles/dashboard.css";
import { useAppContext } from "../AppContext.js";

// import { highlightSelectedNavItem } from "../SideNavigation";

let cardMetrics = [
  {
    title: "Weekly Sales",
    metrics: "71k",
    emoji: bagIcon,
  },
  {
    title: "New Users",
    metrics: "200k",
    emoji: userIcon,
  },
  {
    title: "Item Orders",
    metrics: "50k",
    emoji: buyIcon,
  },
  {
    title: "Bug Reports",
    metrics: "200",
    emoji: msgIcon,
  },
  {
    title: "Employees",
    metrics: "320",
    emoji: buyIcon,
  },
  {
    title: "Vendors",
    metrics: "25",
    emoji: bagIcon,
  },
];

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`http://localhost:8000/${endpoint}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

function Dashboard(props) {
  const [weatherData, setWeatherData] = useState(null);
  const [dataArea, setDataArea] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [dataLine, setDataLine] = useState([]);
  const { drawerOpen } = useAppContext();

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const areaData = await fetchData("dashboard-data");
      setDataArea(areaData.dataArea);
      setDataPie(areaData.dataPie);
      setDataBar(areaData.dataBar);
      setDataLine(areaData.dataLine);
    };

    fetchDataFromAPI();
  }, []);

  const handleWeatherClick = async () => {
    try {
      const response = await fetch(
        "https://open-weather13.p.rapidapi.com/city/mumbai/EN",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "59da2a0d25mshd4bdd3337f1aa8dp1e07f6jsndc5b0cdd90fa",
            "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      alert(`Weather in Mumbai: ${data.weather[0].main}`);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#f0f0f9",
        flexGrow: 1,
        p: 3,
        transition: "margin-left 0.3s ease",
        marginLeft: `${drawerOpen ? 200 : 0}px`,
        width: `calc(100% - ${drawerOpen ? 200 : 0}px)`,
        height: "200vh",
      }}
    >
      <br />

      <Grid
        container
        justifyContent="space-evenly"
        spacing={2}
        style={{
          paddingTop: "20px",
          paddingLeft: 70,
          paddingBottom: "40px",
          paddingRight: 40,
        }}
        className="dashboard-container"
      >
        <Grid item xs={12} lg={4}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Typography
                align="left"
                style={{
                  fontSize: 40,
                  paddingTop: "30px",
                  paddingBottom: "20px",
                }}
                variant="h2"
              >
                Welcome to, RetailHuB
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ alignItems: "left" }}>
              <Typography
                align="left"
                style={{
                  fontSize: "15px",
                  color: "#707070",
                }}
              >
                Non ante laudantium dictumst hic sit exilium solenni subsequi
                praecustodio typi effeminati odio reputationi aetatis se odit ex
                phasellus brevibus disciplinam ullo Iure praesentes wisi. Liber
                se seruitio arcu:
              </Typography>
              <br />
              <Button
                onClick={handleWeatherClick}
                variant="contained"
                color="primary"
                size="small"
              >
                Get Store Data
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={12} lg={7}>
          <Grid
            container
            justifyContent="space-evenly"
            spacing={2}
            style={{ paddingTop: 25 }}
          >
            {cardMetrics.map((card) => {
              return (
                <Grid item xs={12} sm={4}>
                  <Paper
                    component={Stack}
                    spacing={3}
                    direction="row"
                    className="paper2"
                    sx={{
                      px: 3,
                      py: 5,
                      borderRadius: 2,
                      padding: 2,
                    }}
                  >
                    {<img alt="icon" src={card.emoji} /> && (
                      <Box sx={{ width: 64, height: 64 }}>
                        {<img alt="icon" src={card.emoji} />}
                      </Box>
                    )}

                    <Stack spacing={0.5}>
                      <Typography variant="h4">{card.metrics}</Typography>

                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        {card.title}
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            justifyContent="space-evenly"
            spacing={2}
            style={{
              paddingTop: "40px",
              paddingBottom: "40px",
            }}
          >
            <Grid item xs={12} lg={8}>
              <Card>
                <CardHeader
                  title="Customized Bar Chart"
                  subheader="Different Categories with Multiple Values"
                />

                <CardContent style={{ paddingRight: 20 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={dataBar}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value1" fill="#8884d8" name="Value 1" />
                      <Bar dataKey="value2" fill="#82ca9d" name="Value 2" />
                      <Bar dataKey="value3" fill="#ffc658" name="Value 3" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              {" "}
              <Card>
                <CardHeader
                  title="Expense Distribution"
                  subheader="Categories and their expenses"
                />

                <CardContent style={{ paddingRight: 20 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={dataPie}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                        isAnimationActive={false} // Disable animation for better visibility
                      >
                        {dataPie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card>
                <CardHeader
                  title="Monthly Performance"
                  subheader="User metrics, Sessions, and Revenue"
                />

                <CardContent style={{ paddingRight: 20 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dataLine}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#8884d8" />
                      <Line
                        type="monotone"
                        dataKey="sessions"
                        stroke="#82ca9d"
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#ffc658"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={8}>
              {" "}
              <Card>
                <CardHeader title="Monthly Sales Area Chart" />

                <CardContent style={{ paddingRight: 20 }}>
                  <ResponsiveContainer width="100%" height={325}>
                    <AreaChart data={dataArea}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="uv"
                        stackId="1"
                        stroke="#5f4b8b"
                        fill="#8884d8"
                      />
                      <Area
                        type="monotone"
                        dataKey="pv"
                        stackId="1"
                        stroke="#00C49F"
                        fill="#81c99c"
                      />
                      <Area
                        type="monotone"
                        dataKey="amt"
                        stackId="1"
                        stroke="#FFBB28"
                        fill="#edb852"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
