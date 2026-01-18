"use client";

import { Mic, MicOff, Terminal, Cpu } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { useVoiceCommands } from "@/hooks/useVoiceCommands";
import { useState } from "react";

const initialProjects = [
	{
		title: "Precision National Title",
		description:
			"Enterprise-grade title & escrow services platform with PrecisionAI™ automation.",
		status: "Active" as const,
		isoCompliant: true,
		docStatus: 92,
		url: "/precision-nation-upgraded.html", // Placeholder for local file
	},
	{
		title: "Exposure Website",
		description:
			"Main corporate website with updated branding and service portfolio.",
		status: "Review Needed" as const,
		isoCompliant: false,
		docStatus: 45,
		url: "#",
	},
	{
		title: "Exposure OS Dashboard",
		description:
			"Centralized command center for operations, project management, and file systems.",
		status: "Active" as const,
		isoCompliant: false,
		docStatus: 10,
		url: "/",
	},
	{
		title: "Archive Cleanup",
		description:
			"System-wide storage optimization and cloud migration.",
		status: "Completed" as const,
		isoCompliant: true,
		docStatus: 100,
	},
];

export default function Home() {
	const [projects, setProjects] = useState(initialProjects);
	const [statusMessage, setStatusMessage] = useState("");

	const commands = {
		"show active": () => {
			setProjects(initialProjects.filter((p) => p.status === "Active"));
			setStatusMessage("Filtering: Active Projects");
		},
		"show all": () => {
			setProjects(initialProjects);
			setStatusMessage("Showing all projects");
		},
		"open precision": () => {
			setStatusMessage("Opening Precision National Title...");
			window.open("/precision-nation-upgraded.html", "_blank");
		},
		"run cleanup": async () => {
			setStatusMessage("Initiating System Cleanup Sequence...");
			try {
				const res = await fetch('/api/system', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ action: 'cleanup' })
				});
				const data = await res.json();
				setStatusMessage(data.message || "Cleanup command sent.");
			} catch (e) {
				setStatusMessage("Error executing system command.");
			}
		}
	};

	const { isListening, toggleListening, transcript, aiResponse } = useVoiceCommands(commands);

	return (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-white">
						System Overview
					</h1>
					<p className="text-gray-400 mt-1">
						Review active projects and documentation status.
					</p>
				</div>

				<div className="flex items-center gap-4">
					{/* Status / Transcript Display */}
					<div className="flex flex-col items-end">
						{statusMessage && (
							<span className="text-sm text-[#06b6d4] animate-pulse font-mono tracking-tight">
								{statusMessage}
							</span>
						)}
						{transcript && (
							<span className="text-xs text-gray-500 italic">
								"{transcript}"
							</span>
						)}
						{aiResponse && (
							<span className="text-xs text-purple-400 font-bold">
								{aiResponse}
							</span>
						)}
					</div>

					<button
						onClick={toggleListening}
						className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all border border-white/5 backdrop-blur-sm ${
							isListening
								? "bg-red-500/90 hover:bg-red-600 shadow-red-500/20 animate-pulse"
								: "bg-[#06b6d4]/90 hover:bg-[#0891b2] shadow-[#06b6d4]/20"
						}`}
					>
						{isListening ? (
							<MicOff className="h-4 w-4" />
						) : (
							<Mic className="h-4 w-4" />
						)}
						{isListening ? "Listening..." : "Voice Control"}
					</button>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-5">
					<div className="text-gray-400 text-sm font-medium mb-1">
						Active Projects
					</div>
					<div className="text-3xl font-bold text-white">
						{initialProjects.filter((p) => p.status === "Active").length}
					</div>
				</div>
				<div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-5">
					<div className="text-gray-400 text-sm font-medium mb-1">
						Revisión Necesaria
					</div>
					<div className="text-3xl font-bold text-[#EC4899]">
						{initialProjects.filter((p) => p.status === "Review Needed")
							.length}
					</div>
				</div>
				<div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-5">
					<div className="text-gray-400 text-sm font-medium mb-1">
						Documentación
					</div>
					<div className="text-3xl font-bold text-yellow-400">62%</div>
				</div>
				<div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-5">
					<div className="text-gray-400 text-sm font-medium mb-1">
						Estado del Sistema
					</div>
					<div className="flex items-center gap-2">
						<div className="text-3xl font-bold text-green-400">98%</div>
						<Cpu className="h-5 w-5 text-green-500/50" />
					</div>
				</div>
				<div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-5 hover:border-[#06b6d4]/30 transition-colors cursor-pointer group" onClick={() => commands["run cleanup"]()}>
					<div className="text-gray-400 text-sm font-medium mb-1 group-hover:text-[#06b6d4]">
						Acciones Rápidas
					</div>
					<div className="flex items-center gap-2 text-white font-bold text-sm mt-2">
						<Terminal className="h-4 w-4 text-[#06b6d4]" />
						Executar limpieza del sistema
					</div>
				</div>
			</div>

			{/* Projects Grid */}
			<div>
				<h2 className="text-xl font-bold text-white mb-6">
					Portafolio Activo
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map((project, idx) => (
						<ProjectCard key={idx} {...project} />
					))}
				</div>
			</div>
		</div>
	);
}
