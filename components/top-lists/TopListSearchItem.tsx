export default function TopListSearchItem({ text, onSelect }: {
    text: string;
    onSelect: () => void;
}) {
    return(
        <li key={text}>
            <button
                className="w-full text-left text-lg py-2 px-3 rounded-lg transition-colors hover:bg-tertiary"
                onClick={onSelect}
            >
                {text}
            </button>
        </li>
    )
}