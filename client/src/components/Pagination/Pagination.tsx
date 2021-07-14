import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({
  totalMemes,
  memesPerPage,
  paginate
}: {
  totalMemes: number;
  memesPerPage: number;
  paginate: (number: number) => any;
}) => {
  const [pageNums, setPageNums] = useState<number[]>([1]);
  console.log(totalMemes, memesPerPage)
  
  useEffect(() => {
    let pageNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(totalMemes / memesPerPage); i++) {
      pageNumbers.push(i)
    }
    setPageNums(pageNumbers);
  }, []);
  

  return (
    <div className='pagination'>
      {pageNums.map((number: number) => (
        <div key={number} className='pageNum' onClick={(e) => { paginate(number) }}>
          {number}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
