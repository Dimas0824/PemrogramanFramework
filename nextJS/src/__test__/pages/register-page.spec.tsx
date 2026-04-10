import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegisterPage from "@/pages/auth/register/index";

describe("Register Page", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("shows validation when email is empty", async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Register" }));

    expect(await screen.findByText("Email wajib diisi")).toBeTruthy();
  });

  it("shows validation when password is too short", async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Register" }));

    expect(await screen.findByText("Password minimal 6 karakter")).toBeTruthy();
  });

  it("shows API error message when register fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 400,
      json: async () => ({ name: "Email sudah digunakan" }),
    });

    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Fullname"), {
      target: { value: "User Demo" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/register",
        expect.objectContaining({
          method: "POST",
        }),
      );
      expect(screen.getByText("Email sudah digunakan")).toBeTruthy();
    });
  });
});
