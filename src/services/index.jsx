export const getAllPostServices = async (token) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(
    `${backendURL}/`,
    token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : null
  );

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const getPostsfromUserService = async (username) => {
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

export const getPostByNameFromUserService = async (post_image, token) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(
    `${backendURL}/p/${post_image}`,
    token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : null
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const sendPostService = async ({ data, token }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/image`, {
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

export const likeImageService = async (token, postId) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/image/${postId}/like`, {
    method: "POST",
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

export const deletePostService = async (id, token) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/image/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const searchUserService = async ({ username }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/username/${username}`);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

export const settingsService = async ({ data, token }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/settings`, {
    method: "PUT",
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

export const postCommentsService = async ({ token, postId, data }) => {
  const backendURL = import.meta.env.VITE_BACKEND;
  const response = await fetch(`${backendURL}/image/${postId}/comment`, {
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
