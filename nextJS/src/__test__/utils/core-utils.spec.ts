import fetcher from "@/utils/swr/fetcher";
import useProducts from "@/utils/swr/useProducts";
import { normalizeEvent, normalizeEvents } from "@/data/communityEvents";
import withAuth from "@/Middleware/withAuth";
import middleware, { config } from "@/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import useSWR from "swr";

jest.mock("swr", () => jest.fn());
jest.mock("next-auth/jwt", () => ({
  getToken: jest.fn(),
}));
jest.mock("next/server", () => ({
  NextResponse: {
    next: jest.fn(() => ({ type: "next" })),
    redirect: jest.fn((url: URL) => ({ type: "redirect", destination: url.toString() })),
  },
}));

describe("Core Utils", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it("fetcher returns json response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: true }),
    });

    await expect(fetcher("/api/test")).resolves.toEqual({ status: true });
  });

  it("fetcher throws error for failed response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetcher("/api/test")).rejects.toThrow("Request failed with status 500");
  });

  it("normalizes a single event and fallback values", () => {
    expect(
      normalizeEvent({
        id: "1",
        title: "Event",
        date: "2026-04-10",
        location: "Jakarta",
      }),
    ).toEqual({
      id: "1",
      title: "Event",
      date: "2026-04-10",
      location: "Jakarta",
      category: "General",
      speaker: "TBA",
      summary: "Tidak ada ringkasan.",
    });
  });

  it("filters invalid events and sorts them", () => {
    expect(
      normalizeEvents([
        { id: "2", title: "B", date: "2026-04-12", location: "Bandung" },
        { id: "", title: "Invalid", date: "2026-04-11", location: "Solo" },
        { id: "1", title: "A", date: "2026-04-10", location: "Jakarta" },
      ]),
    ).toEqual([
      expect.objectContaining({ id: "1", title: "A" }),
      expect.objectContaining({ id: "2", title: "B" }),
    ]);
  });

  it("returns normalized products from useProducts", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: {
        status: true,
        data: [
          { id: "1", name: "Produk A", price: 1000, image: "", category: "Umum" },
        ],
      },
      error: undefined,
      isLoading: false,
    });

    expect(useProducts()).toEqual({
      products: [
        { id: "1", name: "Produk A", price: 1000, image: "", category: "Umum" },
      ],
      isLoading: false,
    });
  });

  it("returns error message from useProducts when request fails", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error("failed"),
      isLoading: false,
    });

    expect(useProducts()).toEqual({
      products: [],
      isLoading: false,
      errorMessage: "Gagal memuat data produk. Silakan coba lagi.",
    });
  });

  it("redirects unauthenticated users in withAuth", async () => {
    (getToken as jest.Mock).mockResolvedValue(null);

    const wrapped = withAuth(
      () => NextResponse.next() as never,
      ["/profile"],
    );

    const result = await wrapped(
      {
        url: "http://localhost/profile",
        nextUrl: {
          pathname: "/profile",
          search: "",
        },
      } as never,
      {} as never,
    );

    expect(NextResponse.redirect).toHaveBeenCalled();
    expect(result).toMatchObject({ type: "redirect" });
  });

  it("allows authorized users in withAuth", async () => {
    (getToken as jest.Mock).mockResolvedValue({ role: "admin" });

    const wrapped = withAuth(
      () => "allowed" as never,
      ["/profile"],
    );

    const result = await wrapped(
      {
        url: "http://localhost/admin",
        nextUrl: {
          pathname: "/admin",
          search: "",
        },
      } as never,
      {} as never,
    );

    expect(result).toBe("allowed");
  });

  it("exports middleware config and returns next response", async () => {
    expect(config.matcher).toContain("/profile");
    await expect(
      middleware(
        {
          url: "http://localhost/",
          nextUrl: {
            pathname: "/",
            search: "",
          },
        } as never,
        {} as never,
      ),
    ).resolves.toMatchObject({ type: "next" });
  });
});
