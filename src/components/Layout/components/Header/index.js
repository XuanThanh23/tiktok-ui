import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>{/* Logo */}</div>
                <div className={cx('search')}>{/* Search */}</div>
                <div className={cx('actions')}>{/* Actions */}</div>
            </div>
        </header>
    );
};

export default Header;
