import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
    // const onBack = () => {};
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} className="" />
            </button>
            <h3 className={cx('header-title')}>{title}</h3>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default Header;
