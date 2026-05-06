import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
    children,
    onClick,
    href,
    to,
    leftIcon,
    rightIcon,
    className = '',
    primary = false,
    outline = false,
    size = 'medium',
    text = false,
    disabled = false,
    rounded = false,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    //remove event when disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }
    const classes = cx('wrapper', {
        [className]: true,
        primary,
        outline,
        // small,
        // large,
        [size]: true,
        text,
        disabled,
        rounded,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    href: PropTypes.string,
    to: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    size: PropTypes.string,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
};

export default Button;
