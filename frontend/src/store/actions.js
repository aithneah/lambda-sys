import {studentIndex} from "./sagas/selectors";

const makeActions = actions => {
    Object.entries(actions)
        .forEach(([name, constructor]) => {
            actions[name] = (...args) => {
                const obj = constructor(...args);
                obj.type = name;
                return obj;
            };
            actions[name].Type = name;
            actions[name].withDispatch = (dispatch) => (...args) => dispatch(actions[name](...args));
        });

    return actions;
};

const Empty = () => ({});

const Actions = makeActions({

    getAccountData: (index) => ({ index}),

    setAccountData: (index, name, course) => ({ index, name, course }),

    logAsSupervisor: Empty,

    getAllDeclarationsData: Empty,

    setDeclarationsData: lists => ({ lists}),

    getDeclarationStructureData: (classesId) => ({ classesId }),

    setDeclarationStructureData: (classesId, structure) => ({ classesId, structure }),

    getAllGroupsData: Empty,

    setAllGroupsData: groups => ({ groups }),

    getGroupsListsData: (groupId) => ({ groupId }),

    setGroupsListsData: (groupId, lists) => ({ groupId, lists }),

    getGroupsStudentsData: (groupId) => ({ groupId }),

    setGroupsStudentsData: (groupId, students) => ({ groupId, students }),

    getGroupsListSummary: (groupId, listId) => ({ groupId, listId }),

    setGroupsListSummary: (groupId, summary) => ({ groupId, summary }),

    getStudentProgress: (studentId) => ({ studentId }),

    setStudentProgress: (studentId, studentProgress) => ({ studentId, studentProgress }),

    logOut: Empty,

    clearAccounts: Empty,

    clearDeclarations: Empty,

    clearGroups: Empty,

    clearStudents: Empty,

    updateDeclaration: (classesId, declarationStructure) => ({ classesId, declarationStructure }),

    setCommentData: (list, exercise, subpoint, lang) => ({ list, exercise, subpoint, lang }),

    applyComment: (exerciseId, commentContent, note) => ({ exerciseId, commentContent, note }),

    commentFromTile: (studentIndex, listName, exerciseName, groupId) => ({ studentIndex, listName, exerciseName, groupId }),

    deleteStudent: (studentIndex) => ({ studentIndex }),

    deleteStudentFromStore: (studentIndex, groupId) => ({ studentIndex, groupId })
});

export default Actions;
