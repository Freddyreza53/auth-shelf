import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function ShelfItem({ item, user, newItemDescription, setNewItemDescription }) {

    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    const handleEdit = () => {
        setEditMode(!editMode);
    }

    const handleSave = () => {
        dispatch({
            type: 'UPDATE_ITEM',
            payload: {
                id: item.id,
                newItem: newItemDescription
            }
        
        })
        setEditMode(false);
    }

    return (
        <>
            {editMode ? 
            <li key={item.id}>
                <input 
                    type="text" 
                    placeholder={item.description} 
                    value={newItemDescription} 
                    onChange={(event) => setNewItemDescription(event.target.value)}
                /><button onClick={handleSave}>Save</button>
            </li>

                :

                <li>{item.description}
                    {user.id == item.user_id &&
                        <>
                            <button onClick={() => handleDelete(item.id)}>DELETE</button>
                            <button onClick={handleEdit}>Edit</button>
                        </>
                    }</li>}

            {/* <img src={item.image_url}/> */}
        </>
    )
}

export default ShelfItem;