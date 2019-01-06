import Actions from "../actions";

const initialState = null;

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.setCommentData.Type:
            return {...state,
                list: action.list,
                exercise: action.exercise,
                subpoint: action.subpoint,
                lang: action.lang};
        default:
            return state;
    }
};

export default commentReducer;