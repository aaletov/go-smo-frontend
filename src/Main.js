import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter,
  Routes
} from "react-router-dom";
import Home from "./Home";
import PivotPage from "./PivotPage";
import Waveform from "./Waveform";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);


const drawerWidth = 240;

class Main extends Component {
  onload() {
    console.log("loaded")
    //WaveDrom.ProcessAll()
  }

  render() {
    let links = ["/", "/waveform", "/pivot"]
    const drawer = (
      <div>
        <Toolbar />
        <Divider />
        <List>
          {['Home', 'Waveform', 'Pivot'].map((text, index) => ( 
            <NavLink to={links[index]}> 
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
                
              </ListItem>
            </NavLink>   
          ))}
        </List>
      </div>
    );

    const container = document.getElementById('root')

    return (
      <HashRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/pivot" element={<PivotPage/>}/>
            <Route path="/waveform" element={<Waveform/>}/>
          </Routes> 
        </Box>
      </Box>
      </HashRouter>
    );
  }
}

export default Main;