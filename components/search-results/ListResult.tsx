import BaseResult from "./BaseResult";

export default function ListResult({ item, onSelect }: {
    item: string;
    onSelect: (item: string) => void;
}) {
    return(
        <BaseResult 
            onClick={() => onSelect(item)}
            className="text-sm"
        >
            {item}
        </BaseResult>
    )
}