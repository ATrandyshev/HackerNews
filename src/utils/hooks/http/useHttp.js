import { useCallback } from "react";
import { api } from "../../Api/api";
import {
  normalizeDataNews,
  normalizeDataComments,
} from "../../normalizeData/normalizeData";
import { AMOUNT_OF_NEWS } from "../../constants/constansts";

const useHttp = () => {
  const request = async (
    url,
    method = "GET",
    body = null,
    headers = api.headers
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      throw e;
    }
  };

  const getNews = async () => {
    const newsIds = await request(api.news);
    const listNewsItems = await Promise.all(
      newsIds.slice(0, AMOUNT_OF_NEWS).map((id) => request(api.getItem(id)))
    );

    const data = { news: listNewsItems };
    return normalizeDataNews(data);
  };

  const getNewsById = async (id) => {
    const newsIds = [await request(api.getItem(id))];
    const data = { news: newsIds };
    return normalizeDataNews(data);
  };

  const getComments = async (ids) => {
    const listComments = await Promise.all(
      ids.map((id) => request(api.getItem(id)))
    );

    const data = { comments: listComments };
    return normalizeDataComments(data);
  };

  const getComment = async (id) => {
    const listComments = [await request(api.getItem(id))];

    const data = { comments: listComments };
    return normalizeDataComments(data);
  };

  return {
    getNews,
    getNewsById,
    getComments,
    getComment,
  };
};

export default useHttp;
