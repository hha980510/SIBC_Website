"use client";

import { Download } from "lucide-react";
import type { RsvpRecord } from "@/lib/redis";

function toCsvValue(value: string | number) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default function ExportCsvButton({ records }: { records: RsvpRecord[] }) {
  function handleExport() {
    const headers = ["Name", "Phone", "Email", "Guests", "Message", "Submitted At"];
    const rows = records.map((r) => [
      r.name,
      r.phone,
      r.email,
      r.guests,
      r.message,
      new Date(r.createdAt).toLocaleString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(toCsvValue).join(","))
      .join("\n");

    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvp-export-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 text-navy-800 hover:bg-navy-900 hover:text-white font-medium px-5 py-2.5 text-sm transition-all duration-300"
    >
      <Download className="w-4 h-4" />
      Export CSV
    </button>
  );
}
