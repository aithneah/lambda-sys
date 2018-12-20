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

    getAccountData: Empty,

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

    clearStudents: Empty
});

export default Actions;
