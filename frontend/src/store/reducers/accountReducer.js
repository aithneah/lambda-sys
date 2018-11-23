import Actions from "../actions";

const initialState = null;

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.setAccountData.Type:
            return {...state,
                index: action.index,
                name: action.name,
                course: action.course
            };
        default:
            return state;
    }
};

export default accountReducer;
