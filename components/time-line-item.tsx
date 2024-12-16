export function TimelineItem({ title, content }: { title: string; content: string }) {
    return (
        <div className="flex items-center">
            <div className="flex-1 text-right pr-4">
                <h3 className="font-bold text-green-400">{title}</h3>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full z-10"></div>
            <div className="flex-1 pl-4">
                <p>{content}</p>
            </div>
        </div>
    )
}