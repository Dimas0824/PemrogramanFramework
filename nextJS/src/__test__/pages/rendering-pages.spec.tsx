import { render, screen, waitFor } from "@testing-library/react";
import CSRPage from "../../pages/rendering/csr";
import SSRPage, { getServerSideProps } from "../../pages/rendering/ssr";
import SSGPage, { getStaticProps } from "../../pages/rendering/ssg";
import { retrieveCollection } from "../../utils/db/servicefirebase";
import { mockUseRouter, setMockRouter } from "../utils/mock-router";

jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

jest.mock("next/font/google", () => ({
  Manrope: () => ({ className: "font-manrope" }),
}));

jest.mock("../../utils/db/servicefirebase", () => ({
  retrieveCollection: jest.fn(),
}));

describe("Rendering Pages", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
    setMockRouter({
      pathname: "/rendering/csr",
      asPath: "/rendering/csr",
    });
  });

  it("renders CSR page with fetched events", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: "e1",
            title: "Workshop Next.js",
            date: "2026-04-10",
            location: "Bandung",
            category: "Tech",
            speaker: "Alya",
            summary: "Belajar rendering.",
          },
        ],
      }),
    });

    render(<CSRPage />);

    expect(screen.getByText("CSR: Daftar Event Komunitas")).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByText("Workshop Next.js")).toBeTruthy();
    });
  });

  it("renders SSR page with event data", () => {
    render(
      <SSRPage
        events={[
          {
            id: "e2",
            title: "SSR Meetup",
            date: "2026-04-11",
            location: "Jakarta",
            category: "Community",
            speaker: "Nadia",
            summary: "Diskusi SSR.",
          },
        ]}
        generatedAt="2026-04-10T00:00:00.000Z"
      />,
    );

    expect(screen.getByText("SSR: Agenda Event Mingguan")).toBeTruthy();
    expect(screen.getByText("SSR Meetup")).toBeTruthy();
    expect(screen.getByRole("link", { name: "SSR" }).getAttribute("href")).toBe("/rendering/ssr");
  });

  it("renders SSG page with event data", () => {
    render(
      <SSGPage
        events={[
          {
            id: "e3",
            title: "SSG Bootcamp",
            date: "2026-04-12",
            location: "Surabaya",
            category: "Workshop",
            speaker: "Rafi",
            summary: "Belajar SSG.",
          },
        ]}
        generatedAt="2026-04-10T00:00:00.000Z"
      />,
    );

    expect(screen.getByText("SSG: Informasi Event Publik")).toBeTruthy();
    expect(screen.getByText("SSG Bootcamp")).toBeTruthy();
  });

  it("returns props from getServerSideProps", async () => {
    (retrieveCollection as jest.Mock).mockResolvedValue([
      {
        id: "e4",
        title: "SSR Data",
        date: "2026-04-13",
        location: "Semarang",
        category: "Meetup",
        speaker: "Dina",
        summary: "Data SSR.",
      },
    ]);

    const result = await getServerSideProps({} as never);

    expect(result).toMatchObject({
      props: {
        events: expect.arrayContaining([
          expect.objectContaining({ title: "SSR Data" }),
        ]),
      },
    });
  });

  it("returns props from getStaticProps", async () => {
    (retrieveCollection as jest.Mock).mockResolvedValue([
      {
        id: "e5",
        title: "SSG Data",
        date: "2026-04-14",
        location: "Yogyakarta",
        category: "Meetup",
        speaker: "Rina",
        summary: "Data SSG.",
      },
    ]);

    const result = await getStaticProps({} as never);

    expect(result).toMatchObject({
      props: {
        events: expect.arrayContaining([
          expect.objectContaining({ title: "SSG Data" }),
        ]),
      },
      revalidate: 120,
    });
  });
});
