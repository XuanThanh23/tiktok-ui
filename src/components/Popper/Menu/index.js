import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless'; // different import path!
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ children, items = [], ...passProps }) {
    const renderItems = () => {
        return items.map((item) => <MenuItem key={item.id} data={item}></MenuItem>);
    };
    return (
        <Tippy
            interactive
            // visible
            placement="bottom-end"
            // offset={[16, 16]}
            delay={[0, 700]}
            {...passProps}
            render={(attrs) => (
                <div className={cx('menu')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-items')}>{renderItems()}</PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
