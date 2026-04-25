import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faSearch, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>
                <div className={cx('search')}>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                    />
                    <button>
                        <FontAwesomeIcon icon={faCircleXmark} className={cx('clear')} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                    </button>
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('icon')} />
                    </button>
                </div>
                <div className={cx('actions')}>
                    <button className={cx('upload')}>
                        <span>Upload</span>
                    </button>
                    <button>
                        <span>Log in</span>
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faEllipsisVertical} className={cx('more-btn')} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
