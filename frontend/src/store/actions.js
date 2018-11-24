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

    getAllDeclarationsData: Empty,

    setDeclarationsData: lists => ({ lists}),

    getDeclarationStructureData: (classesId) => ({ classesId }),

    setDeclarationStructureData: (classesId, structure) => ({ classesId, structure }),

    getAllGroupsData: Empty,

    setAllGroupsData: groups => ({ groups })
});

export default Actions;
