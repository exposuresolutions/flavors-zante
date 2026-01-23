"use client";

import { LayoutDashboard, FolderKanban, FileText, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
	{ name: 'Dashboard', href: '/', icon: LayoutDashboard },
	{ name: 'Projects', href: '/projects', icon: FolderKanban },
	{ name: 'Documents', href: '/documents', icon: FileText },
	{ name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[#1e293b] bg-[#0B1120] text-white">
			<div className="flex h-24 items-center justify-center border-b border-[#1e293b] p-4">
				<Link href="/" className="relative h-full w-full">
					<div className="flex flex-col items-center justify-center h-full">
						<div className="relative h-12 w-12 mb-2">
							{/* Fallback stylized logo */}
							<div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 flex items-center justify-center">
								<span className="text-xl font-bold text-cyan-400">E</span>
							</div>
						</div>
						<span className="text-sm font-bold tracking-widest text-white uppercase">
							Exposure
							<span className="text-cyan-400">OS</span>
						</span>
					</div>
				</Link>
			</div>

			<nav className="mt-6 px-4 space-y-2">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={clsx(
								'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
								isActive
									? 'bg-[#06b6d4]/10 text-[#06b6d4]'
									: 'text-gray-400 hover:bg-[#1e293b] hover:text-white'
							)}
						>
							<item.icon className="h-5 w-5" />
							{item.name}
						</Link>
					);
				})}
			</nav>

			<div className="absolute bottom-8 w-full px-4">
				<div className="rounded-xl border border-[#1e293b] bg-[#0f172a] p-4">
					<h4 className="mb-2 text-xs font-semibold text-gray-500 uppercase">
						System Status
					</h4>
					<div className="flex items-center gap-2 text-sm text-green-400">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
						</span>
						Connected to Core
					</div>
				</div>
			</div>
		</aside>
	);
}
