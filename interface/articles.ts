interface Source {
    id: null | string;
    name: string;
}

export interface SingleArticle {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type Articles = SingleArticle[];
