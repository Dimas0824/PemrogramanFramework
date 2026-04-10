import { render, screen } from "@testing-library/react";
import ProfilePage from "@/pages/profile";
import EditProfilePage from "@/pages/profile/edit";

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      user: {
        fullname: "Budi Santoso",
        email: "budi@example.com",
        role: "member",
      },
    },
  }),
}));

describe("Profile Pages", () => {
  it("renders the profile page with user data", () => {
    render(<ProfilePage />);

    expect(screen.getByText("Profil Pengguna")).toBeTruthy();
    expect(screen.getByText("Budi Santoso")).toBeTruthy();
    expect(screen.getByText("budi@example.com")).toBeTruthy();
  });

  it("renders the edit profile page", () => {
    render(<EditProfilePage />);

    expect(screen.getByText("Modifikasi Profil")).toBeTruthy();
    expect(screen.getByDisplayValue("Muhammad Irsyad Dimas Abdillah")).toBeTruthy();
  });
});
