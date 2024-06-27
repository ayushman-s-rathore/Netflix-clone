import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useSelector,useDispatch} from "react-redux";
import { setOpen } from '../redux/movieSlice';
import VideoBackground from './VideoBackground';
import PopUpVideoPlayer from './PopUpVideoPlayer';

export default function MovieDialog() { 
  const {open,id} = useSelector(store=>store.movie);
  const dispatch = useDispatch();

  const handleClose = () =>{
    dispatch(setOpen(false));
  }
 
  return (
    <>
      
      <Dialog
        sx={{
          '& .MuiDialog-paper': { 
          height: "80vh",
          width: '80%', // Set your custom width here
          maxWidth: 'none' // Prevents the dialog from being constrained by default max-width
        }
        }}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" 
      >
       <DialogContent>
          <DialogContentText id="alert-dialog-description h-screen">
            <PopUpVideoPlayer movieId={id}/>
            {/* <VideoBackground movieId={id} bool = {true}/> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}