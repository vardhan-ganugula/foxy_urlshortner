fetch("http://localhost:8000/create", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({
    url : "https://www.google.com",domain:"coderealm.tech"
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err);
  });
