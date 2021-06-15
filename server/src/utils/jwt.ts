import jwt from 'jsonwebtoken';

const tokenize = (user_id: string): string => {
  const JSON_SECRET: any = process.env.JWT_SECRET;
  const token = jwt.sign({ id: user_id }, JSON_SECRET, {
    expiresIn: '30d',
  });
  return token;
};

export { tokenize };
