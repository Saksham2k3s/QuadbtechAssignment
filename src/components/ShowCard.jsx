import React from 'react'
import '../style/ShowCard.css'
import { Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';
function ShowCard(props) {
    const { showData } = props;
    console.log(showData);
  return (
    <>
    <div className="card p-5 mt-4">
    {showData.show.image ? (
    <img src={showData.show.image.original} alt={showData.show.name} className='img-fluid' />
  ) : (<img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?size=626&ext=jpg&ga=GA1.1.163069787.1698077815&semt=ais" alt={showData.show.name} className='img-fluid '  />)}
  <div className="card-body">
    <h1 className='text-center' >{showData.show.name}</h1>
    <div className='ratings mt-2 ' >
{showData.show.rating.average ? (<span>Rating : {showData.show.rating.average} / 10 </span>) : (<span>Rating : Not Rated </span>)}
  <span>Language  {showData.show.language}</span>
    </div>
    <div className='text-center' >
        <Link to={`/show/booking/${showData.show.id}`} ><button className='btn' >Learn more</button></Link>
    </div>
  </div>
    </div>
    </>
  )
}

export default ShowCard