export const fullDate = date => {
  const date_ = new Date(date);
  const day = date_.getDay() + 1;
  const month = date_.toLocaleString('en-us', { month: 'long' });
  const year = date_.getFullYear();

  return `${day}/${month}/ ${year}`;
};

export const leftDate = date => {
  const date_ = new Date(date);
  const month = date_.toLocaleString('en-us', { month: 'long' });
  const year = date_.getFullYear();

  return `${month} ${year}`;
};
