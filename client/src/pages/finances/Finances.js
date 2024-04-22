import * as React from "react";
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
import bagIcon from "../../assets/headers/ic_glass_bag.png";
import buyIcon from "../../assets/headers/ic_glass_buy.png";
import msgIcon from "../../assets/headers/ic_glass_message.png";
import userIcon from "../../assets/headers/ic_glass_users.png";
import "../../styles/finances.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FinancesIncome from "./FinancesIncome";
import FinancesExpense from "./FinancesExpense";
import { useAppContext } from "../../AppContext.js";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Finances(props) {
  const [value, setValue] = React.useState(0);
  const { drawerOpen } = useAppContext();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
  ];

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
        className="finances-container"
        justifyContent="space-evenly"
        spacing={3}
        style={{
          paddingTop: "20px",
          paddingLeft: 70,
          paddingBottom: "40px",
          paddingRight: 40,
        }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="space-evenly"
            spacing={2}
            style={{ paddingTop: 25 }}
          >
            {cardMetrics.map((card) => {
              return (
                <Grid item xs={12} sm={3}>
                  <Paper
                    component={Stack}
                    spacing={3}
                    direction="row"
                    className="test"
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

        <Grid item xs={12} style={{ paddingTop: "50px" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              centered
            >
              <Tab label="Income Transaction Ledger" {...a11yProps(0)} />
              <Tab label="Expense Transaction Ledger" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <FinancesIncome />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <FinancesExpense />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
