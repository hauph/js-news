import { all, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { articleActionTypes } from "../actions/actionConstants";
import { saveArticles, setTotalArticleResult } from "../actions/articleAction";
import { setLoadingStatus } from '../actions/loadingAction';

function* getNewsSaga(action: any) {
    const { payload } = action;
    const { articles, loading, pageNumber, totalResults } = payload;

    // Show loader for loading more
    if (loading) {
        yield put(setLoadingStatus(2))
    }

    try {
        const res: AxiosResponse = yield axios(`/api/get-news?page=${pageNumber}`);
        // @ts-ignore
        const resData = yield res.data;
        let data = {
            articles: resData.articles,
            pageNumber: pageNumber + 1
        }
        if (articles.length) {
            data.articles = [...articles, ...resData.articles]
        }
        if (resData.totalResults !== totalResults) {
            yield put(setTotalArticleResult(resData.totalResults))
        }
        if (articles.length < resData.totalResults) {
            yield put(saveArticles(data));
        }
    } catch (err) {
        console.error(err)
    } finally {
        // Hide loader
        yield put(setLoadingStatus(1))
    }
}

export default function* articleSaga() {
    yield all([
        takeLatest(articleActionTypes.GET_NEWS, getNewsSaga),
    ]);
}