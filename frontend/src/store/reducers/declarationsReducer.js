import Actions from "../actions";

const initialState = null;

const declarationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.setDeclarationsData.Type:
            return [...action.lists];
        default:
            return state;
    }
};

export default declarationsReducer;