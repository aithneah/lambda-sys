import Actions from "../actions";

const initialState = null;

const studentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.setStudentProgress.Type:
            return action.studentProgress;
        default:
            return state;

    }
};

export default studentsReducer;