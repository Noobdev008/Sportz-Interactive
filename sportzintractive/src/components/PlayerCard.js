import React from 'react';
import Card from '@material-ui/core/Card';
import '../index.css';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



// ----  importing players images ----
function importPlayersAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importPlayersAll(require.context('./playerImages', false,  /\.(jpg)$/));


// ----- convert date to Local time in UTC ---
function convertDate(date) {
  var newDate = new Date(`${date} UTC`);
  newDate.toString()
  return newDate;
}


const theme = createMuiTheme();



// ---- function of palyerCard like images, time and many more details ....//
function PlayerCard(props) {
 
  return (
    <div>
      {
        props.ele &&
      <Card >
      <CardActionArea>     

      {/* ----------images-------- */}
        {images[`${props.ele.Id}.jpg`] !==undefined ?
        <CardMedia
          component="img"
          image={images[`${props.ele.Id}.jpg`].default}
          title={props.ele.PFName}
        />
        :
        <></>
}
        <CardContent>
        <ThemeProvider theme={theme}>
        <Typography variant="h5" component="h2">
        {/* -----Player Name */}


        {props.ele.PFName}
        </Typography>
        <Typography  color="textSecondary">
        {/* ----Skills Display----- */}
        {props.ele.SkillDesc}
        </Typography>
        <Typography variant="body2" component="p">
        {/* ------Market Price------ */}


          ${props.ele.Value}
        </Typography>
        {/* -----Upcoming Matches----- */}



          {props.ele.UpComingMatchesList.map((lst,key)=>
          <Typography variant="body2" component="p">
          <b>Upcoming Match:</b> {lst.CCode} Vs {lst.VsCCode} <br/>
          {/* ----Date Time----- */}



          <b>Time:</b> {convertDate(lst.MDate).toTimeString()}
          </Typography>
          )}
          </ThemeProvider>
        </CardContent>
      </CardActionArea>  
    </Card>
      }
    </div>
    
  );
}


export default PlayerCard    // exporting 