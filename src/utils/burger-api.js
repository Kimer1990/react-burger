const apiUrl = "https://norma.nomoreparties.space/api";

const GetRequest = async (url, options = {}) => {
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
  return GetRequest(`${apiUrl}/ingredients`);
};

export const postOrder = async (data) => {
  return GetRequest(`${apiUrl}/orders`, data);
};
