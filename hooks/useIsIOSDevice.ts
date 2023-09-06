export const useIsIOSDevice = () => (
    /iPad|iPhone|iPod/.test(navigator.userAgent)
)