import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faSearch,
    faEllipsisVertical,
    faCloudUpload,
    faMessage,
} from '@fortawesome/free-solid-svg-icons';
// import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Tippy from '@tippyjs/react'; // different import path!
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useState, useEffect } from 'react';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import {
    faLanguage,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faCoins,
    faSignOut,
    faGears,
} from '@fortawesome/free-solid-svg-icons';
import Menu from '~/components/Popper/Menu';
import 'tippy.js/dist/tippy.css';

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
    const currentUser = true;

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

    const userMenu = [
        {
            id: 1,
            title: 'Profile',
            icon: <FontAwesomeIcon icon={faUser} className={cx('hihi')} />,
            to: '/@',
        },
        {
            id: 2,
            title: 'Get coins',
            icon: <FontAwesomeIcon icon={faCoins} className={cx('hihi')} />,
            to: '/@trungbop',
        },
        {
            id: 3,
            title: 'Settings',
            icon: <FontAwesomeIcon icon={faGears} className={cx('hihi')} />,
            to: '/settings',
        },

        ...MENU_ITEMS,
        {
            id: 4,
            title: 'Log out',
            icon: <FontAwesomeIcon icon={faSignOut} className={cx('hihi')} />,
            to: '/login',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>
                <HeadlessTippy
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
                </HeadlessTippy>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy trigger="click" delay={[0, 200]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faCloudUpload} className={cx('icon')} />
                                </button>
                            </Tippy>

                            <Tippy content="Message">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faMessage} className={cx('icon')} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button
                                primary
                                leftIcon={<FontAwesomeIcon icon={faUser} className={cx('icon')} />}
                                // rightIcon={<FontAwesomeIcon icon={faSignOut} className={cx('icon')} />}
                            >
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <img
                                className={cx('user-avatar')}
                                src="https://p16-common-sign.tiktokcdn.com/tos-alisg-avt-0068/9681eb5ebaa11fe1571f8ba178736fe0~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=136086d4&x-expires=1777197600&x-signature=IWWDOqxhK1kYpMrPfBREOnRgcrU%3D&t=4d5b0474&ps=13740610&shp=30310797&shcp=c1333099&idc=my"
                                alt="User avatar"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} className={cx('hihi')} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
};

export default Header;
