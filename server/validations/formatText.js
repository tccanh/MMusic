/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const FormatText = text => {
  const temp = text.trim().toLowerCase();
  return temp.charAt(0).toUpperCase() + temp.substr(1);
};

module.exports = FormatText;
