import { IconButton, Popover, Whisper } from 'rsuite';
import { HiMenu } from '@react-icons/all-files/hi/HiMenu';
import { FiSettings } from '@react-icons/all-files/fi/FiSettings'
import routes from '../constants/routes';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: `h-14 w-full bg-white flex flex-row justify-center items-center shadow-md shadow-gray-400 absolute top-0 xs:px-3 sm:px-6`,
    containerLeft: `w-3/5 flex`,
    containerRight: `w-2/5 flex justify-end`,
    customDivButton: `hover:opacity-90 hover:bg-gray-100 flex flex-row justify-center items-center cursor-pointer rounded p-2`,
    customIconButton: {
        fontSize: '16px',
        color: 'black'
    },
    customTextButton: `text-xs text-black ml-3 font-bold`
}

const listMenu = [
    { id: routes.registerManagement.name, text: 'Register Management', icon: <FiSettings style={styles.customIconButton} />, url: routes.registerManagement.url }
]

function CustomAppbar() {
    const navigate = useNavigate();

    const onClickMenuItems = (url: string) => {
        navigate(url);
    }

    const renderPopover = () => {
        return (
            <Popover>
                {listMenu.map((item: any) => {
                    return (
                        <div
                            id={'ID_MENU_'+item.id}
                            key={'KEY_MENU_'+item.id}
                            className={styles.customDivButton}
                            onClick={() => onClickMenuItems(item.url)}
                        >
                            {item.icon}
                            <p className={styles.customTextButton}>
                                {item.text}
                            </p>
                        </div>
                    );
                })}
            </Popover>
        );
    }

    const renderHamburgerMenu = () => {
        return (
            <Whisper
                placement='bottomEnd'
                trigger='click'
                speaker={renderPopover()}
            >
                <IconButton
                    style={{
                        fontSize: '20px',
                        // backgroundColor: 'red'
                    }}
                    icon={<HiMenu />}
                />
            </Whisper>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerLeft}></div>
            <div className={styles.containerRight}>
                {renderHamburgerMenu()}
            </div>
        </div>
    );
}

export default CustomAppbar;