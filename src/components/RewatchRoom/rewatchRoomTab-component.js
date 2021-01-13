import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RewatchHistory from './rewatchHistory-component';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import ChatHistory from './chatHistory-component';



function TabPanel(props) {
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
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function RewatchRoomTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper style={{maxWidth: 500, height: 670}}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        centered
      >
        <Tab label="History" {...a11yProps(0)} />
        <Tab label="Chat" {...a11yProps(0)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <RewatchHistory></RewatchHistory>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ChatHistory></ChatHistory>
      </TabPanel>
    </Paper>
  );
}