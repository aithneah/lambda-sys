import Actions from "../actions";

const initialState = null;

const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.setAllGroupsData.Type:
            return [...action.groups];
        default:
            return state;
    }
};

export default groupsReducer;