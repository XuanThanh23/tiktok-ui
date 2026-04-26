import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faSearch, faEllipsisVertical, faSignOut } from '@fortawesome/free-solid-svg-icons';
// import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Tippy from '@tippyjs/react/headless'; // different import path!
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useState, useEffect } from 'react';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Header = () => {
    const [searchResult, setSearchResult] = useState([1, 2, 3]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>
                <Tippy
                    interactive={true}
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h3 className={cx('search-title')}>Accounts</h3>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
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
                </Tippy>
                <div className={cx('actions')}>
                    <Button text>Upload</Button>
                    <Button
                        primary
                        leftIcon={<FontAwesomeIcon icon={faUser} className={cx('icon')} />}
                        // rightIcon={<FontAwesomeIcon icon={faSignOut} className={cx('icon')} />}
                    >
                        Log in
                    </Button>
                    {/* <Button outline className={cx('custom-btn')} rounded>
                        Getapp
                    </Button> */}
                    <Button>
                        <FontAwesomeIcon icon={faEllipsisVertical} className={cx('more-btn')} />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
