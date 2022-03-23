import { AppBar, Container, Grid , TextField, Toolbar, Typography } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import MediaCard from './PlayerCard';
import Autocomplete from '@material-ui/lab/Autocomplete';

  
   
function Players (){

    // ---Using Hooks----
    const[formData,setFormData]=useState()

    const[match,setMatch]=useState(0)

    useEffect(()=>{

        fetch("https://api.npoint.io/20c1afef1661881ddc9c") ////Fetching Api from "https://api.npoint.io/20c1afef1661881ddc9c"

        .then(response=>response.json())

        .then(data=>setFormData(data))
    },[])
    const serchingBar=(e)=>{
        console.log(e)

        setMatch({

            PFName:e.target.textContent,
        })
    }   
    console.log(formData,match)
    return(
        <>
        <AppBar position="relative">
                {/* ---Toolbar -  display its children with an inline display  */}
                <Toolbar>

                {/* --- Typograpghy -- standardize the text and its related CSS properties without worrying about browser compatibility issues */}
                <Typography  variant="h6" noWrap>


                    Footballers
                </Typography>
             
           
                <div style={{ width: 300,paddingLeft:'10px' }}>
                
                <Autocomplete
                    freeSolo
                    edge="end"
                    onChange={serchingBar}

                    options={formData && formData.playerList}


                    id="free-solo-demo"
                    getOptionLabel={(option) => option.TName}

                    renderOption={(option) => option.PFName}

                    renderInput={(params) => (

                    <TextField {...params} label="Search" margin="normal" variant="outlined" />
                    )}
                />
               
             </div>
                </Toolbar>
            </AppBar>
        <Container fixed>           
            <div>
            <Grid container spacing={6}>
            {match!==0 &&  match.PFName!==""? 
            formData && formData.playerList.map((ele,key)=>
            match.PFName===ele.PFName &&
                <Grid item xs={3}>
                {/* --Grid ---responsive layout grid adapts to screen size and orientation */}
                <MediaCard ele={ele}/>
                </Grid>
            ):
                formData && formData.playerList.sort((a, b) => parseFloat(a.Value) - parseFloat(b.Value)).map((ele,key)=>
        
                <Grid item xs={3}>  
                  {/*--- grid---responsive layout grid adapts to screen size and orientation   */}
                <MediaCard ele={ele}/>
                </Grid>
            )}
            </Grid>
            </div>
        </Container>
        </>
    )
}

export default Players