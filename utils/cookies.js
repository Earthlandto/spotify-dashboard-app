import Cookies from 'universal-cookie';

export const setCookie = (name = '', value, options) => {
  const cookies = new Cookies();
  cookies.set(name, value, options);
};

export const removeCookie = (name = '', options) => {
  const cookies = new Cookies();
  cookies.remove(name, options);
};
