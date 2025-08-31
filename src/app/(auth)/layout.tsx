import ModeToggle from "@/components/dark-mode/mode-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div >

            <div className="absolute h-16 flex items-center justify-end w-full px-4 border-b ">
                <ModeToggle />
            </div>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
                <div className="w-full max-w-sm">
                    {children}
                </div>
            </div>
        </div>
    )
}
