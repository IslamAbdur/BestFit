'use client';

import React from 'react';
import { useState } from 'react';
import Wardrobe from './components/wardrobe';
import './page.module.css';

import MenuIcon from '@mui/icons-material/Menu'; // Optional, for menu icon
import { AppBar, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material';


export default function Home() {

  const [value, setValue] = useState("home");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" className="appBar">
        <Typography variant="h6" component="div" className="title">
          BestFit
        </Typography>
      </AppBar>

      <div className="tabsContainer">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Home" value={"home"} className="tab" />
          <Tab label="Closet" value={"closet"} className="tab" />
          <Tab label="Create Outfit" value={"create"} className="tab" />
          <Tab label="Upload Clothing" value={"upload"} className="tab" />
        </Tabs>
      </div>

      {value === "home" && 
        <div className="upload">
          Home
        </div>
      }
      {value === "closet" && <div>Closet Content</div>}
      {value === "create" && <div>Create Outfit Content</div>}
      {value === "upload" && 
        <div className="upload">
          <Wardrobe />
        </div>
      }
    </>
  );
}
