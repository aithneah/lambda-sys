const compareFields = (a, b) => {
    const aFields = Object.entries(a);
    const bFields = Object.entries(b);


}

const structEquals = (a, b) => {
    return a === b || a && b && compareFields(a, b);
};