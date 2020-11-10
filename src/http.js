import axios from "axios";

const Http = () => {
  let getOptions = (options) => {
    return options !== undefined
      ? options
      : Object.assign({
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
  };

  let buildUrl = (url) => {
    return `${process.env.REACT_APP_OMDB_API}?apikey=e58deefd${url}`;
  };

  return {
    get: (url) => {
      const tempUrl = buildUrl(url);
      return axios.get(tempUrl);
    },
    put: (url, data, options) => {
      return axios.put(url, data, getOptions(options));
    },
    post: (url, data, options) => {
      return axios.post(url, data, getOptions(options));
    }
  };
};

export default Http;
