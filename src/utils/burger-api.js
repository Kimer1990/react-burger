const apiUrl = "https://norma.nomoreparties.space/api";

const makeRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
  } catch (err) {
    console.error(err);
  }
};

export const getIngredients = async () => {
  return makeRequest(`${apiUrl}/ingredients`);
};

export const postOrder = async (data) => {
  return makeRequest(`${apiUrl}/orders`, data);
};
