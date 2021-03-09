import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='black f3'>
        {`${name}, antal gånger som du har försökt är: `}
      </div>
      <div className='black f1'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;