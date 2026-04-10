import { render, screen } from "@testing-library/react";
import Home from "@/pages";
import AdminPage from "@/pages/admin";
import AppSettingPage from "@/pages/setting/app";
import UserSettingPage from "@/pages/user";
import PasswordSettingPage from "@/pages/user/password";

describe("Simple Pages", () => {
  it("renders the home page", () => {
    render(<Home />);

    expect(screen.getByText("Praktikum Next.js Pages Router")).toBeTruthy();
    expect(screen.getByText("Mahasiswa D4 Pengembangan Web")).toBeTruthy();
  });

  it("renders the admin page", () => {
    render(<AdminPage />);

    expect(screen.getByText("Halaman Admin")).toBeTruthy();
  });

  it("renders the app setting page", () => {
    render(<AppSettingPage />);

    expect(screen.getByText("App Setting Page")).toBeTruthy();
  });

  it("renders the user setting page", () => {
    render(<UserSettingPage />);

    expect(screen.getByText("User Setting Page")).toBeTruthy();
  });

  it("renders the password setting page", () => {
    render(<PasswordSettingPage />);

    expect(screen.getByText("Password Setting Page")).toBeTruthy();
  });
});
