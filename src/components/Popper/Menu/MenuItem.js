import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function MenuItem({ data }) {
    return (
        <Button className={cx('menu-item')} to={data.to} leftIcon={data.icon}>
            <span>{data.title}</span>
        </Button>
    );
}

export default MenuItem;
