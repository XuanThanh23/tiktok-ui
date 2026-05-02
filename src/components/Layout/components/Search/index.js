import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/assets/hooks';

import * as searchService from '~/apiService/searchService';

const cx = classNames.bind(styles);

function Search() {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([1, 2, 3, 4]);
    const [showResult, setShowResult] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setIsLoading(true);
            const result = await searchService.searchApi(debouncedValue);
            setSearchResult(result);
            setIsLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };
    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <HeadlessTippy
            interactive={true}
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h3 className={cx('search-title')}>Accounts</h3>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    className={cx('input')}
                    type="text"
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    value={searchValue}
                    onChange={handleChange}
                    ref={inputRef}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !isLoading && (
                    <button onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} className={cx('clear')} />
                    </button>
                )}
                {isLoading && (
                    <button>
                        <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                    </button>
                )}

                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
