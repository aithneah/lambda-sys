import Actions from "../actions";

const initialState = null;

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.setAccountData.Type:
            return {...state,
                type: "student",
                index: action.index,
                name: action.name,
                course: action.course
            };
        case Actions.logAsSupervisor.Type:
            return {...state,
                type: "supervisor"
            };
        case Actions.clearAccounts.Type:
            return initialState;
        default:
            return state;
    }
};

export default accountReducer;
