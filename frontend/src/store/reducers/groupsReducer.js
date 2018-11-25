import Actions from "../actions";

const initialState = null;

const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.setAllGroupsData.Type:
            return [...action.groups];
        case Actions.setGroupsListsData.Type:
            return [...(state
                .map(group => group.id === action.groupId ?
                    {...group, lists: action.lists} : group))];
        case Actions.setGroupsStudentsData.Type:
            return [...(state
                .map(group => group.id === action.groupId ?
                    {...group, students: action.students} : group))];
        default:
            return state;
    }
};

export default groupsReducer;