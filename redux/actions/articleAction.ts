import { articleActionTypes } from "./actionConstants"

export function saveArticles(data: any) {
    return {
        type: articleActionTypes.SAVE_ARTICLES,
        payload: {
            articles: data.articles,
            pageNumber: data.pageNumber
        },
    }
}

export function setTotalArticleResult(data: number) {
    return {
        type: articleActionTypes.SET_TOTAL_ARTICLE_RESULT,
        payload: {
            totalResults: data
        },
    }
}