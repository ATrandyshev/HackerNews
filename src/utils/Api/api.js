const api = {
  news: "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty",
  getItem: (id) =>
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
  headers: {
    "Content-Type": "application/json",
  },
};

export { api };
