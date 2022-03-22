import React from 'react';

const GroceryInput = ({handleChange, str, handleClick}) => {
    // console.log(props)
    

  return (
    <>
        <input value = {str} onChange = {handleChange} type="text" placeholder="Enter your items"/>
        <button onClick = {handleClick}>Save</button>
    </>
  )
}

export default GroceryInput;