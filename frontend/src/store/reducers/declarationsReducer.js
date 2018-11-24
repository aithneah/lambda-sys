import Actions from "../actions";

const initialState = null;

const declarationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.setDeclarationsData.Type:
            return [...action.lists];
        case Actions.setDeclarationStructureData.Type:
            return [...state
                .map(declaration => declaration.classesId === action.classesId ?
                    {...declaration, structure: action.structure} : declaration)];
        default:
            return state;
    }
};

export default declarationsReducer;