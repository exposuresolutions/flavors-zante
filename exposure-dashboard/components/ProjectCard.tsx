"use client";

import { CheckCircle2, AlertCircle, FileText, Globe } from "lucide-react";
import clsx from "clsx";

interface ProjectProps {
  title: string;
  description: string;
  status: "Active" | "On Hold" | "Completed" | "Review Needed";
  isoCompliant: boolean;
  docStatus: number; // 0-100 percentage
  url?: string;
}

export default function ProjectCard({ title, description, status, isoCompliant, docStatus, url }: ProjectProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#1e293b] bg-[#0f172a] p-6 transition-all hover:border-[#06b6d4]/50 hover:shadow-lg hover:shadow-[#06b6d4]/10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-white group-hover:text-[#06b6d4] transition-colors">{title}</h3>
          <span
            className={clsx(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium mt-2 border",
              status === "Active" && "bg-green-500/10 text-green-400 border-green-500/20",
              status === "Review Needed" && "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
              status === "On Hold" && "bg-gray-500/10 text-gray-400 border-gray-500/20",
              status === "Completed" && "bg-blue-500/10 text-blue-400 border-blue-500/20"
            )}
          >
            {status}
          </span>
        </div>
        {isoCompliant ? (
            <div title="ISO Compliant" className="text-green-500 bg-green-500/10 p-1.5 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
            </div>
        ) : (
            <div title="Documentation Incomplete" className="text-yellow-500 bg-yellow-500/10 p-1.5 rounded-lg">
                <AlertCircle className="h-5 w-5" />
            </div>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-6 line-clamp-2">{description}</p>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500 flex items-center gap-1.5">
                <FileText className="h-3 w-3" /> ISO Documentation
            </span>
            <span className={clsx("font-medium", docStatus === 100 ? "text-green-400" : "text-[#06b6d4]")}>
                {docStatus}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#1e293b]">
            <div
              className={clsx("h-1.5 rounded-full transition-all", docStatus === 100 ? "bg-green-500" : "bg-[#06b6d4]")}
              style={{ width: `${docStatus}%` }}
            ></div>
          </div>
        </div>

        {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full rounded-lg border border-[#1e293b] py-2 text-sm font-medium text-gray-300 hover:bg-[#1e293b] hover:text-white transition-all">
                <Globe className="h-4 w-4" />
                Open Web Preview
            </a>
        )}
      </div>
    </div>
  );
}
