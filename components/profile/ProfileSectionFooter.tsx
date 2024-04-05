export default function ProfileSectionFooter({ showAll, setShowAll }: { 
    showAll: boolean;
    setShowAll: (showAll: boolean) => void;
}) {
    return(
        <div className="p-4 z-20 sticky bottom-0 bg-primary">
            <button 
                className="block text-sm text-secondary hover:text-primary transition-colors ml-auto"
                onClick={() => setShowAll(!showAll)}
            >
                {showAll ? 'Show less' : 'Show all'}
            </button>
        </div>
    )
}