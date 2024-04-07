import { CloseIcon } from "@/assets/icons/CloseIcon";
import { useModal } from "@/contexts/modal";

export default function ModalHeader({ children }: {
    children: React.ReactNode;
}) {
    const { goBack } = useModal(); 

    return(
        <div className="p-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">
                {children}
            </h2>
            <button 
                onClick={goBack}
                aria-label={"Close modal"}
                className="p-1 -m-1 rounded-md hover:bg-tertiary transition-colors"
            >
                <CloseIcon className="w-6" />
            </button>
        </div>
    )
}