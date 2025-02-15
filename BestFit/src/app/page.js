<<<<<<< HEAD
'use client';

import React from 'react';
import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu'; // Optional, for menu icon
import { AppBar,IconButton, Tab, Tabs, Toolbar, Typography  } from '@mui/material';


export default function Home() {

  const [value, setValue] = useState("home")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }



  return (
    <>
    <AppBar position="static">
       <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BestFit
        </Typography>
        {/* Add more elements here, like buttons or user info */}
      </Toolbar>

    </AppBar>


    <Tabs value={value} onChange={handleChange}>
      <Tab label="Home" value={"home"}
       sx={{ color: 'white' }}/>
      <Tab label="Closet" value={"closet"}
      sx={{ color: 'white' }}/>
      <Tab label="Create Outfit" value={"create"}
      sx={{ color: 'white' }}/>
      <Tab label="Upload Clothing" value={"upload"}
      sx={{ color: 'white' }}/>
    </Tabs>
      {value === "home" && <div>Home Content</div>}
      {value === "closet" && <div>Closet Content</div>}
      {value === "create" && <div>Create Outfit Content</div>}
      {value === "upload" && <div>Upload Clothing Content</div>}
    
    </>
=======
import Image from "next/image";
import styles from "./page.module.css";
import UploadPage from "./components/wardrobe.jsx";

export default function Home() {
  return (
    <div className={styles.page}>
      <UploadPage></UploadPage>
    </div>
>>>>>>> 7344d1c (Starting backend api for uploading files)
  );
}
