

const itemList = (state=[], action) => {
    if (action.type === 'SET_LIST_ITEMS') {
        console.log(action.payload);
        
        return action.payload
    }
    return state;
}

export default itemList;