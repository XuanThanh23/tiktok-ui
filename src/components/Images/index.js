import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import images from '~/assets/images';
import classNames from 'classnames';
import styles from './Image.module.scss';
const Image = forwardRef(({ src, alt, fallBack: customFallBack = images.noImage, className, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');
    const handleError = () => {
        setFallBack(customFallBack);
    };
    return (
        <img
            className={classNames(styles.wrapper, className)}
            src={fallBack || src}
            alt={alt}
            ref={ref}
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    fallBack: PropTypes.string,
    className: PropTypes.string,
};

export default Image;
