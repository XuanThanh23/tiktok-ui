import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless'; // different import path!
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const defauFn = () => {};

function Menu({ children, items = [], onChange = defauFn, ...passProps }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = (attrs) => (
        <div className={cx('menu')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-items')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                {renderItems()}
            </PopperWrapper>
        </div>
    );

    const handleResetToFirstPage = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            interactive
            // visible
            placement="bottom-end"
            offset={[14, 8]}
            delay={[0, 700]}
            {...passProps}
            render={renderResult}
            onHide={handleResetToFirstPage}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.func,
};

export default Menu;
