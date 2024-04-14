import { ArrowIcon } from "@/assets/icons/ArrowIcon";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import CarouselItem from "./CarouselItem";
import CarouselButton from "./CarouselButton";

const OFFSET_INDEX = 1;
const TRANSITION_DURATION = 300;
export default function Carousel({ items, className, itemsPerPage=4 }: {
    items: React.ReactNode[];
    itemsPerPage?: number;
    className?: string;
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const preventEffect = useRef(false);
    
    const chunks = Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, i) => {
        return items.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage);
    });

    const firstChunk = chunks[0];
    const lastChunk = chunks[chunks.length - 1];

    const hasMultiplePages = chunks.length > 1;
    const isOutOfBounds = chunks[activeIndex] === undefined;
    const isLastChunk = activeIndex === chunks.length - 1;

    useEffect(() => {
        if(!hasMultiplePages) return;

        if(preventEffect.current) {
            preventEffect.current = false;
            return;
        }
        if(!contentRef.current) return;

        const initialOffsetTranslation = lastChunk.length / itemsPerPage;
        const offsetTranslation = (isLastChunk || isOutOfBounds) ? (
            initialOffsetTranslation - (1 - initialOffsetTranslation)
        ) : (
            initialOffsetTranslation
        );

        let translateX: number;
        if(activeIndex >= 0) {
            translateX = -(activeIndex + offsetTranslation) * 100;
        } else {
            translateX = 0;
        }
        contentRef.current.style.transform = `translateX(${translateX}%)`;

        if(isOutOfBounds) {
            setTimeout(() => {
                if(!contentRef.current) return;

                let index: number;
                if(activeIndex > chunks.length - 1) {
                    index = 0;
                } else {
                    index = chunks.length - 1;
                }

                const translate = -(index + initialOffsetTranslation) * 100;

                contentRef.current.style.transition = 'none';
                contentRef.current.style.transform = `translateX(${translate}%)`;

                preventEffect.current = true;
                setActiveIndex(index);

                setTimeout(() => {
                    if(!contentRef.current) return;
                    contentRef.current.style.transition = `transform ${TRANSITION_DURATION}ms`;
                }, 10);
            }, TRANSITION_DURATION);
        }
    }, [activeIndex]);

    const handlePrev = () => {
        setActiveIndex((prev) => prev - 1);
    }
    const handleNext = () => {
        setActiveIndex((prev) => prev + 1);
    }

    const initialTranslate = hasMultiplePages ? (
        -(lastChunk.length / itemsPerPage) * 100
    ) : 0;
    return(
        <div className="relative">
            {hasMultiplePages && (
                <CarouselButton 
                    onClick={handlePrev}
                    type="prev"
                />
            )}
            <div className={twMerge(
                "overflow-hidden",
                className,
            )}>
                <div
                    className="-mx-1 flex transition-transform duration-300"
                    style={{ transform: `translateX(${initialTranslate}%)` }}
                    ref={contentRef}
                >
                    {hasMultiplePages && (
                        <CarouselItem
                            itemCount={lastChunk.length}
                            itemsPerPage={itemsPerPage}
                        >
                            {lastChunk}
                        </CarouselItem>
                    )}
                    {chunks.map((item, index) => (
                        <CarouselItem
                            key={index}
                            itemCount={item.length}
                            itemsPerPage={itemsPerPage}
                        >
                            {item}
                        </CarouselItem>
                    ))}
                    {hasMultiplePages && (
                        <CarouselItem
                            itemCount={firstChunk.length}
                            itemsPerPage={itemsPerPage}
                        >
                            {firstChunk}
                        </CarouselItem>
                    )}
                </div>
            </div>
            {hasMultiplePages && (
                <CarouselButton 
                    onClick={handleNext}
                    type="next"
                />
            )}
        </div>
    )
}