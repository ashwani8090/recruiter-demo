import { useState } from 'react';
import { useSelector } from 'react-redux'
import { CaretDownFilled } from '@ant-design/icons';
import { setAccessToken, setUserDetails } from '../../redux/slices/persistedSlice'
import { useDispatch } from 'react-redux';
import './styles.css';
import Popover from '@mui/material/Popover';

const Avtaar = ({ user }) => {
  return (<div className='avtaar' >{user?.name[0]}</div>)
}

const Header = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state?.persistedSlice?.details);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleLogout = () => {
    dispatch(setAccessToken(null));
    dispatch(setUserDetails(null));
    setAnchorEl(null);
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='header'>
      <div className='header-title'>
        <span style={{ color: '#ffffff' }}>My</span>
        <span style={{ color: '#43AFFF' }}>Jobs</span>
      </div>
      {userDetails ? <div style={{ display: 'flex', alignItems: 'center', width: 70, justifyContent: 'space-between' }}>
        <Avtaar user={userDetails} />
        <CaretDownFilled style={{color:'#ffffff'}} onClick={handleClick} />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <button className='header-btn' onClick={handleLogout}>
            {'Logout'}
          </button>
        </Popover>
      </div> : null}
    </div>)

}


export default Header;