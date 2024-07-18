interface ImageProps {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    layout?: string;
    objectFit?: string;
}

function NextImage({ src, alt, ...props }: ImageProps): React.ReactNode {
    return <img src={src} alt={alt} {...props} />;
}

export default NextImage;
