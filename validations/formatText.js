/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const FormatText = text => {
  const temp = text.trim().toLowerCase();
  return temp
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};
module.exports = FormatText;
