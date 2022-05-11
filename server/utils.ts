export const validateObjectKeys = (obj: any, keys: string[]) => {
  let res = true;

  keys.forEach((key: string) => {
    if (!obj || !obj[key]) {
      res = false;
    }
  });

  return res;
};
