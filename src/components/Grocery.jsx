import React, { useState } from 'react';
import GroceryInput from './GroceryInput';
import GroceryList from './GroceryList';
import LoadingBar from 'react-top-loading-bar';

const Grocery = () => {
    const [str, setStr] = useState('');
    const [load, setLoad] = useState(false);
    const [progress, setProgress] = useState(0);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);

    React.useEffect(() => {
    //   console.log('hello');
        getData();
    }, [page]);

    React.useEffect(async () => {
        let data = await fetch(`http://localhost:3004/todo`);
        let data1 = await data.json();
        // console.log(data1);
        setTotal(data1.length);
    }, []);
    

    const postData = async (payload) => {
        try {
            setProgress(30);
            setLoad(true);
            let response1 = await fetch(`http://localhost:3004/todo`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {'Content-Type' : 'application/json'},
            })
            setProgress(50);

            let response2 = await response1.json();
            // console.log(response2);
            setTimeout(() => {
                setProgress(100);
                getData(); 
                setLoad(false);
            }, 1000);
        } 
        catch (error) {
            console.log(error)
        }
    }

    const getData = async () => {
        let data = await fetch(`http://localhost:3004/todo?_page=${page}&_limit=3`);
        let data1 = await data.json();
        console.log(data1);
        setList(data1);
    }

    const handleClick = () => {
        // console.log(str);
        const payload = {title : str, status : false};
        postData(payload);
    }

    const handleChange = (e) => {
        // console.log(e);
        setStr(e.target.value);
    }

    const delData = async(id) => {
        setProgress(30);
        setLoad(true);
        try {
            let deletedItem = await fetch(`http://localhost:3004/todo/${id}`, {
                method : "DELETE",
            });
            setTimeout(() => {
                getData();
                setLoad(false);
            }, 1000);

        } catch (error) {
            console.log(error);
        }
        setProgress(100);
    }

    const handlePrev = () => {
        // setPage((prevPage) => prevPage - 1)
        // console.log(page)
        setPage(page-1);
    }

    const handleNext = () => {
        // setPage((prevPage) => prevPage + 1)
        // console.log(page)
        // console.log(list);
        setPage(page+1);
    }

  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div>Grocery</div>
      <GroceryInput handleChange = {handleChange} str = {str} handleClick = {handleClick}/>
      
      {/* <Loader/> */}
      <GroceryList load = {load} list = {list} setList = {setList} delData = {delData} handlePrev = {handlePrev} handleNext = {handleNext} page={page} total ={total}/>
      
    </>
  )
}

export default Grocery;