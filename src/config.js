export const BASE_URL = 'https://strapi.cleverland.by';

export const ALL_BOOKS = `/api/books`;
export const ALL_CATEGORIES = `/api/categories`;
export const AUTH = `/api/auth/local`;
export const REG = `/api/auth/local/register`;

export const searchByBook = (id) => `${ALL_BOOKS}/${id}`;
