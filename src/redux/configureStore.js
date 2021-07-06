import {createStore, combineReducers} from 'redux';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
//import { Reducer, initialState } from './reducer';
// ^ the const we export in reducer file

// export const ConfigureStore = () => {
//     const store = createStore(
//         Reducer,
//         initialState
//     );

//     return store;
// };

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        })
    );

    return store;
};