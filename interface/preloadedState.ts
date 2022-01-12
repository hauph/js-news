import { Articles } from "./articles";

export interface PreloadedState {
    article: {
        articleIndex: number,
        articles: Articles,
        pageNumber: number,
        totalResults: number,
    },
    loading: number
}