"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Sun } from "lucide-react";

export default function SidebarMobile() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <div className="flex w-full h-16 items-center justify-between border-b px-4 bg-bg-tertiary ">
            {isCollapsed ?
                <Link href="#" className="flex items-center" prefetch={false}>
                    <Sun className="h-6 w-6" />
                </Link> :
                <Link href="#" className="flex items-center gap-4" prefetch={false}>
                    <Sun className="h-6 w-6" />
                    <span className="text-lg font-semibold text-text-primary">mPlaces Admin</span>
                </Link>}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`rounded-full transition-transform ${isCollapsed ? "rotate-180" : ""}`}
            >
                <ChevronDown className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
            </Button>
        </div>
    )
}
