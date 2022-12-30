function timestampToDate(unixTS) {
  const date = new Date();
  date.setTime(unixTS * 1000);
  let result =
    ("0" + date.getDate()).slice(-2) +
    "." +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "." +
    date.getFullYear();

  return result.toString();
}

const normalizeDataNews = (data) => {
  const results = data.news.map(
    ({ title, score, by, time, id, text, kids, url }) => {
      return {
        title: title,
        score: score,
        author: by,
        date: timestampToDate(time),
        idNewsItem: id,
        text: text,
        commentIds: kids,
        url: url,
      };
    }
  );
  return results;
};

const normalizeDataComments = (data) => {
  const results = data.comments.map(
    ({ id, by, kids, text, time, deleted = false }) => {
      return {
        author: by,
        date: timestampToDate(time),
        idComment: id,
        text: text,
        idsSubComment: kids,
        deleted,
      };
    }
  );
  return results;
};

export { normalizeDataNews, normalizeDataComments };
