import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { UserListItem, UserRole } from "@/utils/db/servicefirebase";

const roleOptions: UserRole[] = ["member", "editor", "admin"];

const HalamanEditor = () => {
  const { data }: any = useSession();
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/users/roles");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal memuat data user");
      }

      setUsers(result.data || []);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Gagal memuat data user"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, role: UserRole) => {
    setIsSaving(userId);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/users/roles", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, role }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal memperbarui role");
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId ? { ...user, role } : user
        )
      );
      setMessage("Role user berhasil diperbarui.");
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Gagal memperbarui role"
      );
    } finally {
      setIsSaving(null);
    }
  };

  return (
    <>
      <Head>
        <title>Halaman Editor</title>
      </Head>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <section className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Editor Area
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mt-3">
            Halaman Khusus Editor
          </h1>
          <p className="text-gray-600 mt-4 leading-7">
            Area ini ditujukan untuk editor yang bertugas meninjau, memperbarui,
            dan mengelola konten sebelum dipublikasikan.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
              <h2 className="text-lg font-semibold text-emerald-900">
                Informasi Akun
              </h2>
              <p className="text-sm text-emerald-800 mt-2">
                Nama: {data?.user?.fullname || "-"}
              </p>
              <p className="text-sm text-emerald-800">
                Email: {data?.user?.email || "-"}
              </p>
              <p className="text-sm text-emerald-800">
                Role: {data?.user?.role || "-"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Tugas Editor
              </h2>
              <ul className="text-sm text-slate-700 mt-2 space-y-2 list-disc list-inside">
                <li>Review draft artikel</li>
                <li>Edit konten sebelum tayang</li>
                <li>Validasi kualitas publikasi</li>
                <li>Kelola role user melalui panel editor</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Manajemen Role User
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Ubah role user secara langsung dari halaman editor.
                </p>
              </div>
              <button
                type="button"
                onClick={fetchUsers}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Memuat..." : "Refresh Data"}
              </button>
            </div>

            {message && (
              <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {message}
              </p>
            )}

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      Nama
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      Provider
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      Role
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading && users.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-sm text-center text-gray-500"
                      >
                        Belum ada data user.
                      </td>
                    </tr>
                  )}

                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100">
                      <td className="px-4 py-4 text-sm text-gray-800">
                        {user.fullname || "-"}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {user.email}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 uppercase">
                        {user.type || "credentials"}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800"
                          value={user.role || "member"}
                          onChange={(event) =>
                            handleRoleChange(
                              user.id,
                              event.target.value as UserRole
                            )
                          }
                          disabled={isSaving === user.id}
                        >
                          {roleOptions.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {isSaving === user.id ? "Menyimpan..." : "Siap"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HalamanEditor;
