import { HYDRATE } from 'next-redux-wrapper'
import { LoadingAction } from '../../interface/actions';
import { loadingActionTypes } from '../actions/actionConstants';
import { preloadedState } from '../preloadedState';

export default function loading(state = preloadedState.loading, action: LoadingAction) {
    const { payload, type } = action;

    switch (type) {
        case HYDRATE: {
            return { state, ...payload }
        }
        case loadingActionTypes.FIRST_LOAD:
        case loadingActionTypes.STABLE:
        case loadingActionTypes.LOAD_MORE:
            return payload.loading;
        default:
            return state;
    }
}