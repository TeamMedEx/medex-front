export const getLocalStorage = async (key) => {
   const res = (await localStorage.getItem(key)) ?? null;
   return res;
};

export const getParsedLocalStorage = async (key) => {
   let res;
   try {
      res = (await localStorage.getItem(key)) ?? null;
      res = JSON.parse(res);
   } catch (error) {
      console.log('error : ', error);
   } finally {
      return res;
   }
};

export const setLocalStorage = async (key, value) => {
   const res = key !== null ? await localStorage.setItem(key, value) : null;
   return res;
};

export const setStringifyLocalStorage = async (key, value) => {
   let res;
   try {
      const valStringify = JSON.stringify(value);
      res = key !== null ? await localStorage.setItem(key, valStringify) : null;
   } catch (error) {
      console.log('error : ', error);
   } finally {
      return res;
   }
};

export const removeLocalStorage = async (key) => {
   try {
      await localStorage.removeItem(key);
   } catch (error) {
      console.log('error : ', error);
   }
};

export const LOCALSTORAGE = {
   USER: 'USER',
   AUTH_TOKEN: 'AUTH_TOKEN',
};
