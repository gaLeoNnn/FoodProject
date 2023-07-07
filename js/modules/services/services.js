const postReq = async (url, obj) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: obj,
  });
  return await res.json();
};

const getResourse = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

export { postReq, getResourse };
