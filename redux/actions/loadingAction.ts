import { loadingActionTypes } from "./actionConstants";

/** loading has 3 stages:
 * - 0: app is fetching data, so we show general loading icon
 * - 1: app is stable, no loading
 * - 2: app is fetching for more articles, so we show load more icon
 */
export function setLoadingStatus(data: 0 | 1 | 2) {
    let type = loadingActionTypes.FIRST_LOAD;
    if (data === 1) {
        type = loadingActionTypes.STABLE;
    } else if (data === 2) {
        type = loadingActionTypes.LOAD_MORE;
    }

    return {
        type,
        payload: {
            loading: data
        },
    }
}