const sortData = (result) => {
  return result.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );
};

module.exports = sortData;
