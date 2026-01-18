import axios from "axios";
import { fetchProducts } from "../products.api";
import { vi } from "vitest";

vi.mock("axios");
beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });
  

describe("fetchProducts", () => {
  test("fetches products successfully", async () => {
    const mockResponse = {
      data: {
        items: [],
        pagination: {
          totalPages: 1,
        },
      },
    };

    (axios.get as any).mockResolvedValue(mockResponse);

    vi.spyOn(window.localStorage, "getItem").mockReturnValue("fake-token");


    const response = await fetchProducts({ page: 1 });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/api/admin/products"),
      expect.objectContaining({
        headers: {
          Authorization: "Bearer fake-token",
        },
      })
    );

    expect(response).toEqual(mockResponse.data);
  });

  test("throws an error when API call fails", async () => {
    // 1. Fake the token
    vi.spyOn(window.localStorage, "getItem").mockReturnValue("fake-token");
  
    // 2. Make axios.get FAIL
    (axios.get as any).mockRejectedValue(new Error("API Error"));
  
    // 3. Call the function and expect it to throw
    await expect(fetchProducts({ page: 1 })).rejects.toThrow("API Error");
  });
});
