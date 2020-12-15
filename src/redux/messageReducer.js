export const defaultState = {
    message: "hola"
};
  
export const messageReducer = (state = defaultState, { type, data }) => {
    switch (type) {
        case 'SET_MESSAGE':
        return state
        default:
        return state;
    }

};
  