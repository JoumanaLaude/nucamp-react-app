import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';
// ^ the const we export in reducer file

export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialState
    );

    return store;
};