export class queryBuilder {
  constructor() {
    this.queries = [];
  }
  filter(filterList) {
    const res = filterList
      .filter((filter) => Boolean(filter.value))
      .map(
        (filter) =>
          `filters[${filter.column}][$${filter.operator}]=${filter.value}`,
      )
      .join('&');
    if (res) {
      this.queries.push(res);
    }
    return this;
  }
  sort(sortConfig) {
    if (sortConfig.column) {
      this.queries.push(`sort=${sortConfig.column}%3A${sortConfig.order}`);
    } else {
      this.queries.push(`sort=createdAt%3Adesc`);
    }
    return this;
  }
  paginate(page, perPage) {
    if (perPage) {
      this.queries.push(`page=${page}&perPage=${perPage}`);
    }
    return this;
  }
  build() {
    return this.queries.join('&');
  }
}
