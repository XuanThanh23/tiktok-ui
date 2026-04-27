import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faSearch, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
// import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Tippy from '@tippyjs/react/headless'; // different import path!
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useState, useEffect } from 'react';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import { faLanguage, faCircleQuestion, faKeyboard, faUser } from '@fortawesome/free-solid-svg-icons';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        id: 1,
        title: 'English',
        icon: <FontAwesomeIcon icon={faLanguage} className={cx('hihi')} />,
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'fr',
                    title: 'Tiếng Pháp',
                },
                {
                    type: 'language',
                    code: 'lao',
                    title: 'Tiếng Lào',
                },
                {
                    type: 'language',
                    code: 'cambodian',
                    title: 'Tiếng Campuchia',
                },
                {
                    type: 'language',
                    code: 'chinese',
                    title: 'Tiếng Trung',
                },
                {
                    type: 'language',
                    code: 'thailand',
                    title: 'Tiếng Thái',
                },
            ],
        },
    },
    {
        id: 2,
        title: 'Feedback and help',
        icon: <FontAwesomeIcon icon={faCircleQuestion} className={cx('hihi')} />,
        to: '/feedback',
    },
    {
        id: 3,
        title: 'Keyboard shortcuts',
        icon: <FontAwesomeIcon icon={faKeyboard} className={cx('hihi')} />,
    },
];

const Header = () => {
    const [searchResult, setSearchResult] = useState([1, 2, 3]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    const handleMenuChange = (item) => {
        switch (item.type) {
            case 'language':
                console.log(item.title);
                break;
            default:
                break;
        }
    };

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

                    <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} className={cx('hihi')} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
};

export default Header;
