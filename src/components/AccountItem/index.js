import styles from './AccountItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Images';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/@${data.username}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt="Avatar" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span> {data.name}</span>
                    <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                </h4>
                <p className={cx('username')}>{data.username}</p>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
