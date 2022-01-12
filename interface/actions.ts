import { Articles } from './articles';

type _Type = string

export interface ArticleAction {
    type: _Type;
    payload: {
        articleIndex?: number,
        articles?: Articles,
        pageNumber?: number,
        totalResults?: number
    }
}

export interface LoadingAction {
    type: _Type;
    payload: {
        loading: number,
    }
}