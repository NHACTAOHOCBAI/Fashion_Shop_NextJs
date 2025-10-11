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
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import convertAlias from "@/lib/convertAlias"
import { useLogout } from "@/hooks/queries/useAuth"
import { logout } from "@/store/authSlice"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Header() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)
    const { mutate: logOut } = useLogout()
    const { data: departmentSelections } = useDepartmentSelections()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const handleLogout = () => {
        logOut(undefined, {
            onSuccess: () => {
                dispatch(logout()) // Xóa user trong Redux + localStorage
                router.push("/")         // Quay về trang chủ
                toast.success("Logout success")
            },
            onError: () => {
                dispatch(logout())  // Vẫn xóa local dù API lỗi
                router.push("/")
                toast.error("Logout failed")
            },
        })
    }
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
                    <Link href="/my-cart" className="relative p-[10px] hover:scale-[0.9] transition-all duration-300 hover:opacity-70">
                        <div className="right-0 top-0 absolute text-[12px] rounded-full bg-red-400 w-[20px] h-[20px] flex items-center justify-center">
                            3
                        </div>
                        {ICONS.CART}
                    </Link>
                    {
                        user && <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="hover:scale-[0.9] transition-all duration-300 hover:opacity-70">
                                    {ICONS.MY_ACCOUNT}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback className="rounded-lg">{convertAlias(user.fullName)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{user.fullName}</span>
                                            <span className="truncate text-xs">{user.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link className="w-full" href={'/my-account/profile'}>Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link className="w-full" href={'/my-account/addresses'}>Addresses</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link className="w-full" href={'/my-account/orders'}>Orders</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link className="w-full" href={'/my-account/wishlist'}>Wishlist</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link className="w-full" href={'/my-account/notifications'}>Notifications</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleLogout()}>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
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
