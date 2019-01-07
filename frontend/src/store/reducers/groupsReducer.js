import Actions from "../actions";

const initialState = null;

const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.setAllGroupsData.Type:
            return [...action.groups];
        case Actions.setGroupsListsData.Type:
            return [...state
                .map(group => group.id === action.groupId ?
                    {...group, lists: action.lists} : group)];
        case Actions.setGroupsStudentsData.Type:
            return [...state
                .map(group => group.id === action.groupId ?
                    {...group, students: action.students} : group)];
        case Actions.setGroupsListSummary.Type:
            return [...state
                .map(group => group.id === action.groupId ?
                {...group, summary: action.summary} : group)];
        case Actions.deleteStudentFromStore.Type:
            let groupToModify = {...state.find(group => group.id === action.groupId)};
            let index = groupToModify.students.findIndex(student => student.index === action.studentIndex);
            console.log(groupToModify);
            groupToModify.students.splice(index, 1);
            return [...state.map(group => group.id === action.groupId ?
                groupToModify : group)]
        case Actions.clearGroups.Type:
            return initialState;
        default:
            return state;
    }
};

export default groupsReducer;