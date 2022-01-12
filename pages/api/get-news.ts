// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Articles } from './../../interface/articles';

type Data = {
    status: string,
    articles: Articles,
    totalResults: number,
    error?: Error
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { query } = req;
    axios(`https://newsapi.org/v2/everything?qInTitle=javascript&apiKey=${process.env.API_KEY}&language=en&page=${query.page}`)
        .then(response => {
            const data = response.data;
            res.status(200).json(data);
        })
        .catch(err => {
            console.error('get-news >>>', err)
            res.status(err.response.status).json({
                articles: [],
                status: err.response.status + '',
                totalResults: 0,
                error: err.response.data
            });
        })
}
