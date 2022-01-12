/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { Masonry } from "masonic";
import { BaseLoading } from "../components/BaseLoading/BaseLoading";
import { articleActionTypes } from "../redux/actions/actionConstants";
import { PreloadedState } from "../interface/preloadedState";
import { Articles, SingleArticle } from "../interface/articles";

type Props = {
  articles: Articles;
  pageNumber: number;
  articleIndex: number;
  loading: number;
  totalResults: number;
};

const Home = (props: Props) => {
  let inProcess = false;
  let timerId = setTimeout(() => {});
  let firstLoad = true;

  const { articles, pageNumber, articleIndex, totalResults, loading } = props;

  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const [_articles, setArticles] = useState<Articles>(
    JSON.parse(JSON.stringify(articles))
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!articles.length) {
      // Load articles in page 1
      dispatch({
        type: articleActionTypes.GET_NEWS,
        payload: {
          pageNumber: 1,
          articles,
          loading,
          totalResults,
        },
      });
    } else {
      // If there is 'articleIndex'; we will highlight corresponding element
      setTimeout(() => {
        const elm = document.querySelector(`[data-index="${articleIndex}"]`);
        if (elm) {
          // Add class 'highlight' to highlight article we just viewed
          elm.classList.add("highlight");
        }
      }, 1000);
    }
    // attach scroll event to window to handle case "load more" when reaching bottom of window
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onScroll = () => {
    if (articleIndex > -1) {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        firstLoad = false;
      }, 1000);

      if (!firstLoad) {
        const elm = document.querySelector(".highlight");
        // Remove class 'highlight'
        if (elm) {
          elm.classList.remove("highlight");
        }
      }
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // Only run query request when there is no running one
      if (loading === 1) {
        if (_articles.length !== articles.length) {
          // Load more articles when scrolling to bottom
          dispatch({
            type: articleActionTypes.GET_NEWS,
            payload: {
              pageNumber: pageNumber,
              articles,
              loading,
              totalResults,
            },
          });
          setArticles(_articles);
        }
      }
    }
  };

  const checkImgDimesion = (e: any) => {
    e.classList.remove("default-height");

    if (e.naturalWidth < 100) {
      // Hide img tag for images whose size are too small
      e.parentNode.parentNode.classList.add("hide-img");
    }
  };

  const renderArticle = ({
    index,
    data: { author, title, description, url, urlToImage },
  }: {
    index: number;
    data: SingleArticle;
  }) => {
    const Article = (
      <div
        key={url}
        className="article"
        //onClick={e => this.handleOnClickArticle(e, index)}
        data-index={index}
      >
        <div className="article__title">
          <h3>
            <a href={url} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>
          <i>{author}</i>
        </div>
        <div
          className="article__image"
          style={{
            backgroundImage: `url(${
              urlToImage === null || urlToImage === ""
                ? "https://i.stack.imgur.com/y9DpT.jpg"
                : urlToImage
            })`,
          }}
        >
          <img
            className="default-height" // Give img default height when waiting for src completes loading
            src={
              urlToImage === null || urlToImage === ""
                ? "https://i.stack.imgur.com/y9DpT.jpg"
                : urlToImage
            }
            alt=""
            onLoad={(e) => {
              checkImgDimesion(e.target);
            }}
          />
        </div>
        <div className="article__description">
          <p>{description}</p>
        </div>
      </div>
    );

    return Article;
  };

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="articles">
        <h1>Javascript News</h1>

        {loading && articles.length ? (
          <>
            <Masonry
              // Provides the data for our grid items
              items={articles}
              // Adds 10px of space between the grid cells
              columnGutter={10}
              // Sets the minimum column width to 300px
              columnWidth={300}
              // Pre-renders 5 windows worth of content
              overscanBy={5}
              // This is the grid item component
              render={renderArticle}
              // Sets the initial height of the masonry grid
              itemHeightEstimate={window.innerHeight}
              // Scrolls to a given index within the grid
              scrollToIndex={articleIndex < 0 ? undefined : articleIndex}
            />
            {loading === 2 && <BaseLoading loadMore={true} />}
          </>
        ) : (
          <BaseLoading loadMore={false} />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: PreloadedState) => ({
  articles: state.article.articles,
  pageNumber: state.article.pageNumber,
  articleIndex: state.article.articleIndex,
  totalResults: state.article.totalResults,
  loading: state.loading,
});

export default connect(mapStateToProps)(Home);
