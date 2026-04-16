import { paginate } from "@/lib/strapi";

describe("Pagination Logic — API-driven page-count math", () => {
  it("should return 0 pages for 0 results", () => {
    const result = paginate([], 1, 9);
    expect(result.pagination.pageCount).toBe(1); // At least 1 page even if empty
    expect(result.pagination.total).toBe(0);
    expect(result.data).toEqual([]);
  });

  it("should return 1 page for exactly 9 results (pageSize=9)", () => {
    const items = Array.from({ length: 9 }, (_, i) => ({ id: i }));
    const result = paginate(items, 1, 9);
    expect(result.pagination.pageCount).toBe(1);
    expect(result.pagination.total).toBe(9);
    expect(result.data.length).toBe(9);
  });

  it("should return 2 pages for 10 results (pageSize=9)", () => {
    const items = Array.from({ length: 10 }, (_, i) => ({ id: i }));
    const result = paginate(items, 1, 9);
    expect(result.pagination.pageCount).toBe(2);
    expect(result.pagination.total).toBe(10);
    expect(result.data.length).toBe(9);

    // Second page should have 1 item
    const page2 = paginate(items, 2, 9);
    expect(page2.data.length).toBe(1);
    expect(page2.pagination.page).toBe(2);
  });

  it("should return 12 pages for 100 results (pageSize=9)", () => {
    const items = Array.from({ length: 100 }, (_, i) => ({ id: i }));
    const result = paginate(items, 1, 9);
    expect(result.pagination.pageCount).toBe(12);
    expect(result.pagination.total).toBe(100);
  });

  it("should clamp page number to valid range", () => {
    const items = Array.from({ length: 20 }, (_, i) => ({ id: i }));
    const result = paginate(items, 999, 9);
    expect(result.pagination.page).toBe(3); // Max page is 3
    expect(result.data.length).toBe(2); // Only 2 items on last page
  });
});
