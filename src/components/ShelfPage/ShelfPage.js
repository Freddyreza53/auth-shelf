import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ShelfPage() {
  const dispatch = useDispatch();
  const itemList = useSelector(store => store.shelf);
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    dispatch({
      type: 'FETCH_ITEMS'
    })
  }, [])

  const handleClick = () => {
    console.log('clicked');
    
  }

  console.log('item list is', itemList);


  return (
    <div className="container">
      <h2>Shelf</h2>
      <input type="text" placeholder="Description" value={newItem} onChange={(event) => setNewItem(event.target.value)}/>

      <button onClick={handleClick}>Add New Item</button>
      <ul>
        {itemList.map(item => {
          return (
            <li key = {item.id}>{item.description}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default ShelfPage;
