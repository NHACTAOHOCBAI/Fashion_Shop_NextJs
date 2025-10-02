"use client"

import * as React from "react"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useDepartmentSelections } from "@/hooks/queries/useDepartment"
import { ICONS } from "@/constants/icon.enum"

export default function Header() {
    const { data: departmentSelections } = useDepartmentSelections()
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 0) // cuộn xuống >0 thì true
        }
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 py-5
        ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md " : "bg-transparent"}
      `}
        >
            <div className="flex items-center mx-auto w-[1200px] transition-all duration-300 justify-between">
                <div className="font-bold">LOGO HERE</div>

                <NavigationMenu viewport={false} className="ml-[30px]">
                    <NavigationMenuList>
                        {departmentSelections?.map((department) => (
                            <NavigationMenuItem key={department.id}>
                                <NavigationMenuTrigger className="bg-transparent">
                                    {department.name}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-2 md:w-[600px] lg:w-[800px] lg:grid-cols-4">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <div
                                                    className="relative h-full w-full flex flex-col justify-end p-6
                                     rounded-md overflow-hidden bg-cover bg-center bg-no-repeat"
                                                    style={{ backgroundImage: `url(${department.imageUrl})` }}
                                                >
                                                    {/* overlay */}
                                                    <div className="absolute inset-0 bg-black/40" />
                                                    {/* text */}
                                                    <div className="relative z-10">
                                                        <div className="mt-4 mb-2 text-lg font-medium text-white">
                                                            {department.name}
                                                        </div>
                                                        <p className="text-sm leading-tight text-white/90">
                                                            {department.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </NavigationMenuLink>
                                        </li>

                                        {department.categories.map((category) => (
                                            <ListItem
                                                key={category.id}
                                                href={`/products/${department.slug}/${category.slug}`}
                                                title={category.name}
                                            >
                                                {category.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex items-center gap-[20px]">
                    <Link href="/my-cart" className="relative p-[10px]">
                        <div className="right-0 top-0 absolute text-[12px] rounded-full bg-red-400 w-[20px] h-[20px] flex items-center justify-center">
                            3
                        </div>
                        {ICONS.CART}
                    </Link>
                    <div>
                        {ICONS.MY_ACCOUNT}
                    </div>
                </div>
            </div>
        </header>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
