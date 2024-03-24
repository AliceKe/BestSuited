export const groupPostingsByCompany = (postings) => {

}


export const setNestedPropertyValue = (obj, path, value) => {
    const properties = path.split('.');
    const lastProperty = properties.pop();

    const nestedObject = properties.reduce((nested, property) => {
        if (!nested[property]) {
            nested[property] = {};
        }
        return nested[property];
    }, obj);

    nestedObject[lastProperty] = value;
    return obj;
};