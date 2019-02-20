import React from 'react';
import classes from './Input.css'; 

const input = props => {
  let element = null;
  const inputClasses = [classes.Input];
  let validationError = null;

  if(props.touched && props.invalid && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
  }

  switch(props.elementType) {
    case('input'):
      element = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} />;
      break;
    case('textarea'):
      element = <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} />;
      break;
    case('select'):
      element = <select 
        className={inputClasses.join(' ')} 
        value={props.value}
        onChange={props.changed}>
        {props.elementConfig.options.map(option => (
          <option key={option.value} value={option.value}>{option.displayValue}</option>
        ))}
      </select>;
      break;
    default: 
      element = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} />
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.lable}</label>
      {element}
      {validationError}
    </div>
  );
};

export default input;