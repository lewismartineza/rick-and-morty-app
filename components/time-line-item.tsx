import "./time-line-item.scss";

type TimeLineItemProps = {
    readonly title: string;
    readonly content: string
};

export function TimelineItem({ title, content }: TimeLineItemProps) {
    return (
        <div className="timeline-item">
            <div className="timeline-item--title">
                <h3 className="font-bold text-green">{title}</h3>
            </div>
            <div className="bg-green timeline-item--separator"></div>
            <div className="timeline-item--content">
                <p>{content}</p>
            </div>
        </div>
    )
}