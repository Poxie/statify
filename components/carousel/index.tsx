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
    const [controlsDisabled, setControlsDisabled] = useState(false);

    const contentRef = useRef<HTMLDivElement>(null);
    
    const chunks = Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, i) => {
        return items.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage);
    });

    const firstChunk = chunks[0];
    const lastChunk = chunks[chunks.length - 1];

    const hasMultiplePages = chunks.length > 1;
    const isOutOfBounds = chunks[activeIndex] === undefined;
    const isLastChunk = activeIndex === chunks.length - 1;

    useEffect(() => {
        if(controlsDisabled) return;
        if(!hasMultiplePages) return;
        if(!contentRef.current) return;

        setControlsDisabled(true);

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

                setActiveIndex(index);

                setTimeout(() => {
                    if(!contentRef.current) return;
                    
                    contentRef.current.style.transition = `transform ${TRANSITION_DURATION}ms`;

                    setControlsDisabled(false);
                }, 10);
            }, TRANSITION_DURATION);
        } else {
            setControlsDisabled(false);
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
                    disabled={controlsDisabled}
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
                            hasMultiplePages={hasMultiplePages}
                        >
                            {lastChunk}
                        </CarouselItem>
                    )}
                    {chunks.map((item, index) => (
                        <CarouselItem
                            key={index}
                            itemCount={item.length}
                            itemsPerPage={itemsPerPage}
                            hasMultiplePages={hasMultiplePages}
                        >
                            {item}
                        </CarouselItem>
                    ))}
                    {hasMultiplePages && (
                        <CarouselItem
                            itemCount={firstChunk.length}
                            itemsPerPage={itemsPerPage}
                            hasMultiplePages={hasMultiplePages}
                        >
                            {firstChunk}
                        </CarouselItem>
                    )}
                </div>
            </div>
            {hasMultiplePages && (
                <CarouselButton 
                    disabled={controlsDisabled}
                    onClick={handleNext}
                    type="next"
                />
            )}
        </div>
    )
}