export const getAllPostServices = async () => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/`);

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const getSinglePostService = async (username) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/user/${username}`);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const registerUserService = async ({ email, password, username }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });
  const json = await response.json();

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("El email ya está en uso");
    } else {
      throw new Error(json.message);
    }
  }
  return json.data;
};

export const loginUserService = async ({ email, password }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const getMyUserDataService = async ({ token }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/user`, {
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const getPostByNameFromUserService = async (post_image) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  console.log(post_image);
  const response = await fetch(`${backendURL}/p/${post_image}`);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const sendPostService = async ({ data, token }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const searchImageService = async ({ post_text }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/image/${post_text}`);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};
