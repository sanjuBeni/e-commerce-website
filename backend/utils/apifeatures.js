class ApiFeatures {
  // query is DB Query and queryStr is the query string means URL query string
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // i means Case Insensitive both search small or upper case
          },
        }
      : {};

    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Filter the category like when we filter the laptop, mobile and other product on site...
  filter() {
    const queryCopy = { ...this.queryStr };
    // console.log(queryCopy);
    // remove field
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);
    // console.log(queryCopy);

    // Filter for price and rating rang wise
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    // console.log(queryStr);
    // console.log(JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    // Product skipp according to page Ex... 50 product in over DB and wa want to show 10 data per page then at first page skipp nothing but 2nd page skip 10 * 1 = 10 and 3rd page skip = 20 ... like that...
    const skip = resultPerPage * (currentPage - 1);

    // this.query = Product.find().limit(resultPerPage).skip(skip)
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
