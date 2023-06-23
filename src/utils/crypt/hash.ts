import * as bcrypt from 'bcrypt';

export const hashData = (data: string) => {
  return bcrypt.hash(data, 5);
};

export const compareEncryptedData = (data: string, encrypted: string) => {
  return bcrypt.compare(data, encrypted);
};
