interface ContentProps {
    title: string;
    children: React.ReactNode
}
const Content = ({ title, children }: ContentProps) => {
    return (
        <div className="p-[5px]">
            <header className="mb-5">
                <h2 className="text-2xl font-semibold">{title}</h2>
            </header>
            {children}
        </div>
    )
}
export default Content;