import * as R from 'ramda';

export const updatePropIfSameId = <T>(prop: keyof T, id: string, value: any, who: T): T => {
    const obj = {
        ...who
    };
    if (who[id] === id) {
        obj[prop] = value;
    }
    return obj;
};

export const hasSameId = <T>(id: string, who: T) => {
    const idProp = 'id';
    return who[idProp] === id;
};
