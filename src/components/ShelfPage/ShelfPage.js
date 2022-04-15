import { user } from 'pg/lib/defaults';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShelfItem from '../ShelfItem/ShelfItem';

function ShelfPage() {
  const dispatch = useDispatch();
  const itemList = useSelector(store => store.shelf);
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('');
  const [newEditItem, setNewEditItem] = useState('')
  const user = useSelector(store => store.user)



  useEffect(() => {
    dispatch({
      type: 'FETCH_ITEMS'
    })
  }, [])

  const handleClick = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        newItemDescription,
        newItemUrl
      }
    })

    setNewItemDescription('');
    setNewItemUrl('');
  }



  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: id })
  }




  return (
    <div className="container">
      <h2>Shelf</h2>
      <input type="text" placeholder="Description" value={newItemDescription} onChange={(event) => setNewItemDescription(event.target.value)} />
      <input type="text" placeholder="URL" value={newItemUrl} onChange={(event) => setNewItemUrl(event.target.value)} />
      <button onClick={handleClick}>Add New Item</button>
      <ul>
        {itemList.map(item => {
          return (
            <ShelfItem 
            key={item.id}
            item={item}
            user={user}
            newItemDescription={newItemDescription}
            setNewItemDescription={setNewItemDescription}/>
          )
        })}
      </ul>
    </div>
  );
}

export default ShelfPage;
// {/* <input type="text" placeholder={item.description} value={newItemDescription} onChange={(event) => setNewItemDescription(event.target.value)}/> */}