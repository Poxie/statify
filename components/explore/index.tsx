"use client";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config';

const background = resolveConfig(tailwindConfig).theme?.backgroundColor?.primary;

export default function Explore() {
    return(
        <main className="pt-20">
            <div className="text-center flex flex-col gap-4">
                <h1 className="text-4xl font-semibold">
                    Explore with us.
                </h1>
                <p className="text-lg text-secondary">
                    Find songs you might like based on your favorite songs, artists, and genres!
                </p>
            </div>
            <div 
                className="gradient-border [--border-left:0] [--border-right:0]"
                style={{ '--background': background } as React.CSSProperties}
            >
                <div className="py-8">
                    <div className="w-[900px] max-w-main mx-auto">
                        
                    </div>
                </div>
            </div>
        </main>
    )
}