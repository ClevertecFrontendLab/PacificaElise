export const BASE_URL = 'https://strapi.cleverland.by';

export const ALL_BOOKS = `${BASE_URL}/api/books`;
export const ALL_CATEGORIES = `${BASE_URL}/api/categories`;

export const searchByBook = (id) => `${ALL_BOOKS}/${id}`;
