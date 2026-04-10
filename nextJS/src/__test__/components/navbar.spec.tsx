import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "@/components/layouts/navbar";
import { signIn, signOut, useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

jest.mock("next/dist/client/script", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Navbar", () => {
  it("shows sign in button when session does not exist", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(signIn).toHaveBeenCalled();
  });

  it("shows member information and sign out button", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          fullname: "Sinta",
          email: "sinta@example.com",
          role: "member",
          image: "",
        },
      },
    });

    render(<Navbar />);

    expect(screen.getByText("Welcome, Sinta")).toBeTruthy();
    expect(screen.getByText("Role: member")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Sign Out" }));
    expect(signOut).toHaveBeenCalled();
  });

  it("shows admin link for admin user", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          fullname: "Admin",
          email: "admin@example.com",
          role: "admin",
          image: "",
        },
      },
    });

    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Admin" }).getAttribute("href")).toBe("/admin");
  });
});
