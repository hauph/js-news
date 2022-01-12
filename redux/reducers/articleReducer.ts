import { HYDRATE } from 'next-redux-wrapper'
import { preloadedState } from '../preloadedState';
import { ArticleAction } from '../../interface/actions';
import { articleActionTypes } from '../actions/actionConstants';

const article = (state = preloadedState.article, action: ArticleAction) => {
    const { payload, type } = action;

    switch (type) {
        case HYDRATE: {
            console.log('state >>>', state)
            console.log('payload >>>', payload)
            return { ...state, ...payload }
        }
        case articleActionTypes.SELECT_ARTICLE:
            return {
                ...state,
                articleIndex: payload.articleIndex,
            };
        case articleActionTypes.SAVE_ARTICLES:
            return {
                ...state,
                articles: payload.articles,
                pageNumber: payload.pageNumber,
            };
        case articleActionTypes.SAVE_PAGE:
            return {
                ...state,
                pageNumber: payload.pageNumber,
            };
        case articleActionTypes.SET_TOTAL_ARTICLE_RESULT:
            return {
                ...state,
                totalResults: payload.totalResults,
            };
        default:
            return state;
    }
};

export default article;
