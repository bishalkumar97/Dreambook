import cookies from 'js-cookie';

export const setToken = (token, expiry) => {
    cookies.set('token', JSON.stringify({ value: token, expiry }), {
      expires: 360 * 10, secure: true
    });
};

export const getToken = () => {
  const cookie = cookies.get('token');
  if (!cookie) {
    return null;
  }
  return (cookie);
};

export const removeToken = () => cookies.remove('token');

export const setUser = (user, expiry) => {
  cookies.set('user', JSON.stringify(user), {
    expires: 360 * 10, secure: true
  });
};

export const getUser = () => {
  const cookie = cookies.get('user');
  if (!cookie) {
    return null;
  }
  try{
    return JSON.parse(cookie);
  }
  catch(e){
    console.log(e)
  }
};

export const removeUser = () => cookies.remove('user');

export const setRole = (role) => {
  cookies.set('_r', (role), {
    expires: 360 * 10, secure: true
  });
};

export const getRole = () => {
  const cookie = cookies.get('_r');
  if (!cookie) {
    return null;
  }
  try{
    return (cookie);
  }
  catch(e){
    console.log(e)
  }
};

export const removeRole = () => cookies.remove('_r');