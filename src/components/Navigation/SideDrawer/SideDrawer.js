import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
  let attachClasses = [classes.SideDrawer, classes.Close];
  if(props.show) {
    attachClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <>
      <BackDrop show={props.show} toggleBackDrop={props.toggle}/>
      <div className={attachClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
          </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
}

export default sideDrawer;