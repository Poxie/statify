import clsx from "clsx";
import Track from "@/components/track";
import { usePreview } from ".";

export default function PreviewHistory() {
    const { expanded, history, clearHistory } = usePreview();

    const hasHistory = history.length !== 0;
    return(
        <div
            className={clsx(
                "max-h-[80dvh] border-t-[1px] border-t-primary grid grid-rows-[0fr] overflow-hidden duration-500 transition-[grid-template-rows]",
                expanded && 'grid-rows-[1fr]',
            )}
        >
            <div className={clsx(
                "min-h-0 px-4 transition-[padding]",
                expanded ? 'py-4 scrollbar-dark overflow-auto' : 'py-0',
            )}>
                <div className="mb-1 flex justify-between items-center text-xs">
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
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
                        {history.map(track => (
                            <Track 
                                track={track}
                                key={track.id}
                            />
                        ))}
                    </div>
                ) : (
                    <span className="block text-secondary text-xs">
                        Whops, there are no tracks in your history.
                    </span>
                )}
            </div>
        </div>
    )
}