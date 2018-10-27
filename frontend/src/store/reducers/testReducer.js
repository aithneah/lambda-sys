import * as actionTypes from '../actions';

const initialState = {
    numberOfStudents: 0,
    students: []
};

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_STUDENT:
            return {
                ...state,
                numberOfStudents: state.numberOfStudents + 1,
                students: [...state.students, {index: action.index, name: action.name, surname: action.surname}]
            };
        case actionTypes.REMOVE_STUDENT:
            return {
                ...state,
                numberOfStudents: (state.numberOfStudents === 0 ? 0 : state.numberOfStudents - 1),
                students: (state.students.length > 0 ? [...state.students].splice(1, 1) : [])
            };
        default:
            return state;
    }
} ;

export default testReducer;