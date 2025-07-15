"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
	{
		name: "Features",
		href: "/explore",
		description: "Discover the power of AetherOS",
	},
	{
		name: "Neural Shell",
		href: "/neural-shell",
		description: "Experience our AI-native command interface",
	},
	{
		name: "Ecosystem",
		href: "/ecosystem",
		description: "Explore apps and integrations",
	},
	{
		name: "Enterprise",
		href: "/enterprise",
		description: "Solutions for organizations",
	},
	{
		name: "Community",
		href: "/community",
		description: "Join the AetherOS community",
	},
	{
		name: "Documentation",
		href: "/docs",
		description: "Learn how to use AetherOS",
	},
]

export function Navbar() {
	const [isScrolled, setIsScrolled] = React.useState(false)

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<header
			className={cn(
				"fixed top-0 z-50 w-full transition-all duration-200",
				isScrolled
					? "bg-slate-950/75 backdrop-blur-lg border-b border-slate-800"
					: "bg-transparent"
			)}
		>
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3"
				aria-label="Global"
			>
				<div className="flex items-center gap-x-12">
					<Link href="/" className="flex items-center space-x-2">
						<Image
							src="/aether-logo.svg"
							alt="AetherOS"
							width={32}
							height={32}
							className="w-8 h-8"
						/>
						<span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
							AetherOS
						</span>
					</Link>
					<div className="hidden lg:flex lg:gap-x-8">
						{navigation.slice(0, 4).map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
							>
								{item.name}
							</Link>
						))}
					</div>
				</div>
				<div className="flex items-center gap-x-6">
					<Link
						href="/download"
						className="hidden lg:block"
					>
						<Button
							className="relative group px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 
                text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-300"
						>
							Download
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
						</Button>
					</Link>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								className="lg:hidden p-2 -m-2 text-slate-400 hover:text-white"
							>
								<span className="sr-only">Open menu</span>
								<Menu className="h-6 w-6" aria-hidden="true" />
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="w-[60%] bg-slate-950/95 backdrop-blur border-slate-800"
						>
							<div className="mt-6 flow-root">
								<div className="space-y-4">
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className="block p-3 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors"
										>
											<div className="font-medium">{item.name}</div>
											<p className="mt-1 text-sm text-slate-400">
												{item.description}
											</p>
										</Link>
									))}
									<Link
										href="/download"
										className="block p-3"
									>
										<Button
											className="w-full relative group px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 
                        text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-300"
										>
											Download AetherOS
											<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
										</Button>
									</Link>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	)
}
