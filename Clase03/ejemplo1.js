const posts = [
  {
    title: "Post 1",
    body: "This is the post 1",
  },
  {
    title: "Post 2",
    body: "This is post 2",
  },
];

const getPosts = () => {
  //simulo funcion asincronica usando tiemout
  setTimeout(() => {
    let output = "<ul>";
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    output += "</ul>";
    document.body.innerHTML = output;
  }, 2000);
};

const createPost = (post, callback) => {
  //Simulo creacion de post utilizando timeout y ejecutando el callback
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 3000);
};

createPost({ title: "Post 3", body: "This is post 3" }, getPosts);
getPosts();
