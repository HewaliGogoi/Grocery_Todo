import React from 'react';
import Loader from './Loader';

const GroceryList = ({list, setList, delData, load, handlePrev, handleNext, page, total}) => {
  return (
      <>
        <div>Grocery List</div>
        {
          load ? <Loader/> : list.map((e) => <div key = {e.id}>
                  <li>{e.title} <button onClick={() => {delData(e.id)}}>Delete</button></li>
              </div>)
        }
        <button disabled={page == 1} onClick={handlePrev}>Previous</button>
        <button disabled={page>=Math.ceil(total/3)} onClick={handleNext}>Next</button>
      </>
  )
}

export default GroceryList;