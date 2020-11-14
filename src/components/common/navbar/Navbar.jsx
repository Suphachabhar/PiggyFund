/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import GetAppIcon from '@material-ui/icons/GetAppRounded';
import PersonIcon from '@material-ui/icons/PersonRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';
import CsvDownload from 'react-json-to-csv';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import cookie from 'react-cookies';

import { NotificationList } from './NotificationList';
import './Navbar.css';
import { GlobalProvider_notification } from '../../../context/GlobalState_notification';

function Navbar () {

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    console.log("cookie clear and logout")
    cookie.remove('userInfo', { path: '/' })
    cookie.remove('trackerData', { path: '/' })
    cookie.remove('currency', { path: '/' })
    cookie.remove('rate', { path: '/' })
    window.location.href = '/'
  }
  

  return (
    // Header Nav Bar and connect to the desire pages 
    <section className="navbar">
      
      <div className="navbar-item" onClick={handleClickOpen}>
        <GetAppIcon style={{ color: '#404040', fontSize: 24 }}/>
      </div>
      
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Export"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to download the transcation history?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            <CsvDownload 
              data={cookie.load('trackerData')}
              filename="tracker_history.csv"
              style={{ 
                boxShadow:"inset 0px 1px 0px 0px #e184f3",
                background:"linear-gradient(to bottom, #5F6EC0 5%, #3247B7 100%)",
                backgroundColor:"#5F6EC0",
                borderRadius:"6px",
                border:"1px solid #a511c0",
                display:"inline-block",
                cursor:"pointer","color":"#ffffff",
                fontSize:"15px",
                fontWeight:"bold",
                padding:"6px 24px",
                textDecoration:"none",
                textShadow:"0px 1px 0px #9b14b3"
              }}
            >
              EXPORT
            </CsvDownload>
          </Button>
        </DialogActions>
      </Dialog>

      <a href="/account" className="navbar-item">
          <PersonIcon style={{ color: '#404040', fontSize: 24 }} />
      </a>
              
      <div className="notifier">
            <GlobalProvider_notification>
                <NotificationList />
            </GlobalProvider_notification>
      </div>

      <a href="/" className="navbar-item">
        <ExitToAppIcon style={{ color: '#404040', fontSize: 24 }} onClick={logout} />
      </a>

    </section>
  )

}

export default Navbar;