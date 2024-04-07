import { twMerge } from "tailwind-merge";
import ProfilePodium from "./ProfilePodium";

export default function ProfileTopItem({ children, index }: {
    children: React.ReactNode;
    index: number;
}) {
    return(
        <li className={twMerge(
            "flex flex-col",
            index === 1 && 'order-0 md:order-[unset]',
            index === 2 && 'order-1 md:order-[unset]',
            index === 3 && 'order-2 md:order-[unset]',
        )}>
            {children}
            <ProfilePodium index={index} />
        </li>
    )
}