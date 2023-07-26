import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Pagination from '@mui/material/Pagination';

const Sentences = () => {
  const [value_in_array, setValueInArray] = useState([]);
  const [page, setPage] = useState(1);
  const sentencesPerPage = 11;
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [number, setNumber] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get('http://localhost:3000/updatedSentence.txt');
  //     let value = await response.data;
  //     let value_in_array = value.split('\n');
  //     setValueInArray(value_in_array);
  //   };
  //   fetchData();
  // }, []);


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sentence = searchParams.get('sentence');
    console.log("sentences")
    console.log(sentence)
    const ending = /(?<=[।])/g;
    let value_in_array = sentence.split(ending);
    setValueInArray(value_in_array);
    console.log(value_in_array);
  }, []);

  const handleClick = (index,item) => {
    setTimeout(() => {
      setHighlightedIndex(index);
      window.parent.postMessage({ index, item }, '*');
    }, 500);
    console.log(index);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * sentencesPerPage;
const endIndex = startIndex + sentencesPerPage;
const selectedSentences = value_in_array.slice(startIndex, endIndex);
const pageCount = Math.ceil(value_in_array.length / sentencesPerPage);



  return (
    <div>
      {selectedSentences.map((item, index) => (
        <p key={startIndex + index} style={{ backgroundColor: highlightedIndex === startIndex + index ? 'yellow' : 'white' }} onClick={event => handleClick(startIndex + index,item)}>
          {startIndex + index + 1}. {item}
        </p>
      ))}
      <div className='alignPagination'>
        <Pagination count={pageCount} size="large" page={page} onChange={handleChangePage} />
      </div>


    </div>
  );
};

export default Sentences;
