import clsx from "clsx";
import Track from "@/components/track";
import { usePreview } from ".";

export default function PreviewHistory() {
    const { expanded, history, clearHistory } = usePreview();

    const hasHistory = history.length !== 0;
    return(
        <div
            className={clsx(
                "border-t-[1px] border-t-primary grid grid-cols-1 grid-rows-[0fr] duration-500 transition-[grid-template-rows]",
                expanded && 'grid-rows-[1fr]',
            )}
        >
            <div className={"min-h-0 max-w-full duration-500 transition-[padding]"}>
                <div className="mb-1 pt-4 px-4 flex justify-between items-center text-xs">
                    <span>
                        Playback history
                    </span>
                    {hasHistory && (
                        <button
                            className="transition-colors text-secondary hover:text-primary"
                            onClick={clearHistory}
                        >
                            Clear history
                        </button>
                    )}
                </div>
                {hasHistory ? (
                    <div className="mt-2 px-4 pb-4 flex-1 flex gap-4 overflow-auto scrollbar-dark">
                        {history.map(track => (
                            <Track 
                                className={"max-w-[200px]"}
                                track={track}
                                key={track.id}
                            />
                        ))}
                    </div>
                ) : (
                    <span className="block px-4 pb-4 text-secondary text-xs">
                        Whops, there are no tracks in your history.
                    </span>
                )}
            </div>
        </div>
    )
}