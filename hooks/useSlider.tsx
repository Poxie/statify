import { RefObject, useEffect, useRef } from 'react';

export const useSlider = ({ slider, progress, onChange, onDragStart, onDragEnd }: {
    slider: RefObject<HTMLDivElement>;
    progress: RefObject<HTMLDivElement>;
    onChange?: (sliderDecimal: number) => void;
    onDragStart?: (isClick: boolean) => void;
    onDragEnd?: (decimal: number) => void;
}) => {
    const currentDecimal = useRef(0);

    useEffect(() => {
        if(!slider.current) return;

        const onClick = (e: MouseEvent) => {
            if(onDragStart) onDragStart(true);
            onMouseMove(e);
            if(onDragEnd) onDragEnd(currentDecimal.current);
        }

        slider.current.addEventListener('mousedown', onMouseDown);
        slider.current.addEventListener('click', onClick);
        return () => {
            slider.current?.removeEventListener('mousedown', onMouseDown);
            slider.current?.removeEventListener('click', onClick);
        }
    }, []);

    const onMouseDown = () => {
        document.body.style.userSelect = 'none';
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        if(onDragStart) onDragStart(false);
    }
    const onMouseUp = () => {
        document.body.style.userSelect = '';
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        
        if(onDragEnd) onDragEnd(currentDecimal.current);
    }
    const onMouseMove = (e: MouseEvent | React.MouseEvent) => {
        if(!slider.current || !progress.current) return;

        const { left, width } = slider.current.getBoundingClientRect();
        
        const mouseSliderPosition = e.clientX - left;
        let sliderDecimal = mouseSliderPosition / width;

        if(sliderDecimal < 0) sliderDecimal = 0;
        if(sliderDecimal > 1) sliderDecimal = 1;

        progress.current.style.width = `${sliderDecimal * 100}%`;
        
        currentDecimal.current = sliderDecimal;
        
        if(onChange) onChange(sliderDecimal);
    }
}