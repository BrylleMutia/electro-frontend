const paginate = (arr: any[], pageNumber: number = 1, pageSize: number = 10) => {
  return arr.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export default paginate;
