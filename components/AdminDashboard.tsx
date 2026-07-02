"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Loader2, Lock, RefreshCw, Search } from "lucide-react";
import type { RegistrationRecord } from "@/lib/supabase";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const csvHeaders: (keyof RegistrationRecord)[] = [
  "id",
  "full_name",
  "phone",
  "email",
  "gender",
  "birth_date",
  "facebook_url",
  "hometown",
  "current_city",
  "university",
  "year",
  "major",
  "class_info",
  "student_id",
  "gpa",
  "gpa_scale",
  "english_certificates",
  "professional_certificates",
  "other_certificates",
  "awards",
  "team_name",
  "proof_links",
  "referral_source",
  "expectations",
  "created_at"
];

function csvEscape(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export function AdminDashboard() {
  const [token, setToken] = useState("");
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadRegistrations = async (nextToken = token) => {
    if (!nextToken.trim()) {
      setError("Vui lòng nhập admin token.");
      return;
    }

    setIsLoading(true);
    setError("");

    const response = await fetch("/api/admin/registrations", {
      headers: {
        Authorization: `Bearer ${nextToken.trim()}`
      }
    });

    const result = (await response.json()) as {
      registrations?: RegistrationRecord[];
      message?: string;
    };

    setIsLoading(false);

    if (!response.ok) {
      setError(result.message ?? "Không thể tải dữ liệu đăng ký.");
      return;
    }

    sessionStorage.setItem("the-banker-admin-token", nextToken.trim());
    setToken(nextToken.trim());
    setRecords(result.registrations ?? []);
    setHasLoaded(true);
  };

  useEffect(() => {
    const savedToken = sessionStorage.getItem("the-banker-admin-token");
    if (savedToken) {
      setToken(savedToken);
      void loadRegistrations(savedToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return records;
    }

    return records.filter((record) =>
      [
        record.full_name,
        record.email,
        record.phone,
        record.university,
        record.major,
        record.team_name,
        record.student_id,
        record.current_city
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [query, records]);

  const stats = useMemo(() => {
    const universities = new Set(records.map((record) => record.university));
    const teams = new Set(records.map((record) => record.team_name));
    const today = new Date().toLocaleDateString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh"
    });
    const todayCount = records.filter(
      (record) =>
        new Date(record.created_at).toLocaleDateString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh"
        }) === today
    ).length;

    return [
      { label: "Tổng hồ sơ", value: records.length },
      { label: "Trường đại học", value: universities.size },
      { label: "Đội thi", value: teams.size },
      { label: "Đăng ký hôm nay", value: todayCount }
    ];
  }, [records]);

  const exportCsv = () => {
    const rows = filteredRecords.map((record) =>
      csvHeaders.map((header) => csvEscape(record[header])).join(",")
    );

    const csv = `\uFEFF${[csvHeaders.join(","), ...rows].join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `the-banker-2026-registrations-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <Card className="p-5 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <label className="mb-2 block text-sm font-bold text-banker-navy" htmlFor="admin-token">
              Admin token
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-banker-orange" />
              <Input
                className="pl-11"
                id="admin-token"
                onChange={(event) => setToken(event.target.value)}
                placeholder="Nhập ADMIN_DASHBOARD_TOKEN"
                type="password"
                value={token}
              />
            </div>
          </div>
          <Button disabled={isLoading} onClick={() => loadRegistrations()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Tải danh sách
          </Button>
        </div>
        {error ? (
          <p className="mt-4 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}
      </Card>

      {hasLoaded ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <Card className="p-5" key={item.label}>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-banker-navy/54">
                  {item.label}
                </p>
                <p className="mt-3 text-4xl font-black text-banker-navy">
                  {item.value.toLocaleString("vi-VN")}
                </p>
              </Card>
            ))}
          </div>

          <Card className="p-5 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-banker-orange" />
                <Input
                  className="pl-11"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm theo tên, email, trường, chuyên ngành, đội thi..."
                  value={query}
                />
              </div>
              <Button onClick={exportCsv} variant="dark">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[1180px] border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.14em] text-banker-navy/52">
                    {[
                      "Thời gian",
                      "Họ tên",
                      "Liên hệ",
                      "Trường & chuyên ngành",
                      "GPA",
                      "Đội thi",
                      "Hồ sơ"
                    ].map((header) => (
                      <th className="border-b border-banker-orange/12 px-3 py-3 font-black" key={header}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr className="align-top" key={record.id}>
                      <td className="border-b border-banker-orange/8 px-3 py-4 text-banker-navy/62">
                        {formatDateTime(record.created_at)}
                      </td>
                      <td className="border-b border-banker-orange/8 px-3 py-4 font-bold text-banker-navy">
                        <span className="block">{record.full_name}</span>
                        <span className="mt-1 block font-normal text-banker-navy/58">
                          {record.gender} · {record.birth_date}
                        </span>
                      </td>
                      <td className="border-b border-banker-orange/8 px-3 py-4 text-banker-navy/68">
                        <span className="block">{record.phone}</span>
                        <span className="block">{record.email}</span>
                      </td>
                      <td className="border-b border-banker-orange/8 px-3 py-4 text-banker-navy/68">
                        <span className="block font-semibold text-banker-navy">{record.university}</span>
                        <span className="block">{record.major} · {record.year}</span>
                      </td>
                      <td className="border-b border-banker-orange/8 px-3 py-4 text-banker-navy/68">
                        {record.gpa}/{record.gpa_scale}
                      </td>
                      <td className="border-b border-banker-orange/8 px-3 py-4 text-banker-navy/68">
                        {record.team_name}
                      </td>
                      <td className="border-b border-banker-orange/8 px-3 py-4 text-banker-navy/68">
                        {record.proof_links ? (
                          <a
                            className="font-bold text-banker-orange hover:underline"
                            href={record.proof_links}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Xem minh chứng
                          </a>
                        ) : (
                          "Chưa có"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!filteredRecords.length ? (
                <p className="py-10 text-center text-sm font-semibold text-banker-navy/58">
                  Không có hồ sơ phù hợp.
                </p>
              ) : null}
            </div>
          </Card>
        </>
      ) : null}
    </div>
  );
}
