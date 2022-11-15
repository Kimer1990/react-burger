const apiUrl = "https://norma.nomoreparties.space/api";

const makeRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
};

export const getIngredients = async () => {
  return makeRequest(`${apiUrl}/ingredients`);
};

export const postOrder = async (data) => {
  return makeRequest(`${apiUrl}/orders`, data);
};
