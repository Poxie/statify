import { CloseIcon } from "@/assets/icons/CloseIcon";
import { useModal } from "@/contexts/modal";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import { twMerge } from "tailwind-merge";

export default function ModalHeader({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) {
    const { goBack } = useModal(); 

    return(
        <div className={twMerge(
            "p-4 flex items-center justify-between",
            className,
        )}>
            <h2 className="text-lg font-medium">
                {children}
            </h2>
            <HasTooltip
                delay={250}
                onClick={goBack}
                tooltip="Close modal"
                className="p-1 -m-1 rounded-md hover:bg-tertiary transition-colors"
                hideOnSmallScreens
                closeOnActive
            >
                <CloseIcon className="w-6" />
            </HasTooltip>
        </div>
    )
}