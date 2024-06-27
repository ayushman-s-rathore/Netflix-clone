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
  const handleClick=(e)=>{
    const loc= JSON.stringify( e.target.className)
    console.log(loc)
    if(e.target.className!="MuiDialogContent-root css-ypiqx9-MuiDialogContent-root" || e.target.className!="MuiDialogActions-root MuiDialogActions-spacing css-knqc4i-MuiDialogActions-root"){
      dispatch(setOpen(false))
    }
  }
  return (
    <>
      
      <Dialog
        sx={{
          '& .MuiDialog-paper': { 
          height: "80vh",
          width: '80%',
          maxWidth: 'none' 
        }
        }}
        onClick={handleClick}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" 
      >
        <DialogActions>
          <Button onClick={handleClose}>CLose</Button>
        </DialogActions>
       <DialogContent>
          <DialogContentText id="alert-dialog-description h-screen">
            <PopUpVideoPlayer movieId={id}/>
            {/* <VideoBackground movieId={id} bool = {true}/> */}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}