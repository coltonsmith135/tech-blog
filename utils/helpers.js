const date = new Date()

module.exports = {
    format_date: () => {
      return `
       ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  };
  