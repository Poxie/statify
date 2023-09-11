export default function TopListSearchItem({ text, onSelect }: {
    text: string;
    onSelect: () => void;
}) {
    return(
        <li key={text}>
            <button
                className="w-full text-left text-sm py-1.5 px-2 rounded-md duration-300 transition-colors text-secondary hover:bg-tertiary hover:text-primary"
                onClick={onSelect}
            >
                {text}
            </button>
        </li>
    )
}