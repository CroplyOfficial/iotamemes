import jwt from 'jsonwebtoken';

const tokenize = (user_id) => {
  const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });
  return token;
};

export { tokenize };
