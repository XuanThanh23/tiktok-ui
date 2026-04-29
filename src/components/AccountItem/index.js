import styles from './AccountItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Images';
const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                src="https://p16-common-sign.tiktokcdn.com/tos-alisg-avt-0068/9681eb5ebaa11fe1571f8ba178736fe0~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=136086d4&x-expires=1777197600&x-signature=IWWDOqxhK1kYpMrPfBREOnRgcrU%3D&t=4d5b0474&ps=13740610&shp=30310797&shcp=c1333099&idc=my"
                alt="Avatar"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span> Bốp Bốp </span>
                    <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                </h4>
                <p className={cx('username')}>trungbop</p>
            </div>
        </div>
    );
}

export default AccountItem;
