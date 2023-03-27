import { useEffect, useState } from 'react';
import { Button, Container, Input, InputGroup, Modal, Radio, RadioGroup, Table, Tooltip, Whisper } from 'rsuite';
import { themes } from '../../constants/themes';
import { ISeatState, IUserRegisterState, useRegisterationContext } from '../../contexts/registration';
import { IoIosBackspace } from '@react-icons/all-files/io/IoIosBackspace';
import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle';
import { RiUserSettingsLine } from '@react-icons/all-files/ri/RiUserSettingsLine';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from '../../constants/validate';
import CustomAppbar from '../../components/CustomAppbar';


const styles = {
    container: `${themes.bg} min-h-screen flex flex-col justify-start items-center p-6 static pt-20`,
    cardTable: `bg-white ${themes.card} w-full min-w-sm max-w-3xl py-6 mb-6`,
    titleForm: 'mb-4 px-6 text-xl font-bold text-black',
    tableHeader: `font-bold text-black`,
    menuConatainer: `max-w-3xl w-full mb-6 flex xs:flex-col sm:flex-row xs:justify-center sm:justify-between xs:items-start, sm:items-center`,
    searchTextField: `${themes.card} xs:mt-3 sm:mt-0`,
    buttonBack: `${themes.card} sm:mr-6 xs:w-20 sm: w-full`,
    textBackButton: 'font-bold text-black text-sm',
    titleSeat: 'mb-4 text-xl font-bold text-black',
    containerSeat: `bg-white ${themes.card} w-full min-w-sm max-w-3xl p-6`,
    containerGridSeat: `flex flex-col justify-center items-center`,
    gridSeat: 'grid xs:grid-cols-5 md:grid-cols-10 gap-2',
    itemSeat: {
        free: { backgroundColor: '#9fdf9f', fontWeight: 'bold', color: 'white' },
        seated: { backgroundColor: '#EEEEEE', fontWeight: 'bold' }
    },
    modalButtonOk: {
        css: { backgroundColor: '#35C184', color: 'white', fontWeight: 'bold' },
    },
    modalButtonCancel: {
        css: { color: 'black', fontWeight: 'bold' },
    },
    modalTitle: 'flex flex-row justify-start items-center',
    modalTextTitle: 'font-bold text-black text-sm mr-2',
    modalBody: 'flex flex-col justify-center items-center max-h-80',
    groupRadio: 'w-3/4',
    rowRadio: 'hover:rounded-md hover:bg-gray-100'
}

const { Column, HeaderCell, Cell } = Table;

const TABLE_HEADER: any = [
    { HEADER: 'ID', dataKey: 'id', width: 78, align: 'center', fixed: true },
    { HEADER: 'Firstname', dataKey: 'firstname', width: 140, align: 'left', fixed: false },
    { HEADER: 'Lastname', dataKey: 'lastname', width: 140, align: 'left', fixed: false },
    { HEADER: 'Phone Number', dataKey: 'phoneNumber', width: 140, align: 'left', fixed: false },
    { HEADER: 'Seat', dataKey: 'seat', width: 70, align: 'center', fixed: false },
    { HEADER: 'Registration Time', dataKey: 'timestamp', width: 200, align: 'left', fixed: false },
];

function RegisterManagement() {
    const { seatData, userRegister, userRegisterAction } = useRegisterationContext();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState<string>('');
    const [dataUserFilter, setDataUserFilter] = useState<any>(userRegister);
    const [sortColumn, setSortColumn] = useState<any>();
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
    const [loading, setLoading] = useState<boolean>(false);

    // MODAL CHANGE SEAT
    const [searchValueModal, setSearchValueModal] = useState<string>('');
    const [selectUserIdRadio, setSelectUserIdRadio] = useState<any>('');
    const [modalSeatId, setModalSeatId] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {

    }, []);

    const getDataSort = () => {
        try {
            debugger;
            if (sortColumn && sortType && !isEmpty(searchValue)) {
                return dataUserFilter.filter((item: any) => (item.firstname + ' ' + item.lastname).includes(searchValue.trim())).sort((a: any, b: any) => {
                    let x = a[sortColumn];
                    let y = b[sortColumn];
                    if (typeof x === 'string') {
                        x = x.charCodeAt(0);
                    }
                    if (typeof y === 'string') {
                        y = y.charCodeAt(0);
                    }
                    if (sortType === 'asc') {
                        return x - y;
                    } else {
                        return y - x;
                    }
                });
            }
            if (sortColumn && sortType) {
                return dataUserFilter.sort((a: any, b: any) => {
                    let x = a[sortColumn];
                    let y = b[sortColumn];
                    if (typeof x === 'string') {
                        x = x.charCodeAt(0);
                    }
                    if (typeof y === 'string') {
                        y = y.charCodeAt(0);
                    }
                    if (sortType === 'asc') {
                        return x - y;
                    } else {
                        return y - x;
                    }
                });
            }
            if (!isEmpty(searchValue)) {
                return dataUserFilter.filter((item: any) => (item.firstname + ' ' + item.lastname).includes(searchValue.trim()));
            }
            return dataUserFilter;
        } catch (error) {
            debugger;
            return dataUserFilter;
        }
    };

    const getDataInModal = () => {
        return userRegister.filter((item: any) => (item.firstname + ' ' + item.lastname).includes(searchValueModal.trim()));
    }

    const handleSortColumn = (sortColumn: any, sortType: any) => {
        // console.log(sortColumn, sortType);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    const onClickClearValue = () => {
        setSearchValue('')
        setSortColumn(null);
        setSortType('asc');
    }

    const onChangeSearchValue = (val: string, e: any) => {
        setLoading(true);
        setSearchValue(val);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }

    const onChangeSearchValueModal = (val: string, e: any) => {
        setSearchValueModal(val);
        setSelectUserIdRadio('');
    }

    const onClickButtonSeat = (seatId: number) => {
        setSearchValueModal('');
        setSelectUserIdRadio('');
        setModalSeatId(seatId);
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handleChangeSeatFromModal = () => {
        if (!isEmpty(selectUserIdRadio)) {
            userRegisterAction.changeSeat(modalSeatId, selectUserIdRadio);
            setOpen(false);
        }
    }

    const renderChipStatus = (status: boolean) => {
        const bgChip = !status ? themes.green : themes.gray;
        const textColor = !status ? 'text-white' : 'text-black'
        const text = !status ? 'Empty' : 'Not Empty'
        return (
            <div className={`${bgChip} ${textColor} text-xs font-bold flex justify-center items-center p-2 max-w-max rounded-md`}>
                {text}
            </div>
        );
    }

    const renderTableRegisteredUser = () => {
        return (
            <div className={styles.cardTable}>
                <p className={styles.titleForm}>
                    List of registered users
                </p>
                <Table
                    bordered
                    height={180}
                    data={getDataSort()}
                    sortColumn={sortColumn}
                    sortType={sortType}
                    onSortColumn={handleSortColumn}
                    loading={loading}
                    className={'bg-white'}
                >
                    {TABLE_HEADER.map((item: any) => {
                        return (
                            <Column key={'COLUMN_' + (item.dataKey).toUpperCase()} width={item.width} align={item.align} fixed={item.fixed} sortable>
                                <HeaderCell className={styles.tableHeader}>{item.HEADER}</HeaderCell>
                                <Cell dataKey={item.dataKey} />
                            </Column>
                        )
                    })}
                </Table>
            </div>
        );
    }

    const renderButtonIconChangeSeat = () => {
        return (
            <div className={styles.containerSeat}>
                <p className={styles.titleSeat}>
                    Change Seat
                </p>
                {userRegister.length > 0
                    ? <div className={styles.containerGridSeat}>
                        <div className={styles.gridSeat}>
                            {seatData.map((item: ISeatState) => {
                                const userData: IUserRegisterState = userRegisterAction.getUserDataFromSeatID(item.seatId);
                                return (
                                    <Whisper
                                        key={'KEY_SEAT' + item.seatId}
                                        placement='top'
                                        controlId='control-id-hover'
                                        trigger='hover'
                                        speaker={
                                            <Tooltip>
                                                {userData
                                                    ? `${userData.firstname} ${userData.lastname}`
                                                    : 'This seat is empty'
                                                }
                                            </Tooltip>
                                        }
                                    >
                                        <Button
                                            id={'ID_SEAT_' + item.seatId}
                                            size={'md'}
                                            style={item.status ? styles.itemSeat.seated : styles.itemSeat.free}
                                            endIcon={
                                                <RiUserSettingsLine
                                                    style={{
                                                        color: item.status ? 'black' : 'white',
                                                        fontSize: '14px'
                                                    }}
                                                />
                                            }
                                            onClick={() => onClickButtonSeat(item.seatId)}
                                        >
                                            {(item.seatId) + 1}
                                        </Button>
                                    </Whisper>
                                );
                            })}
                        </div>
                    </div>
                    : <></>
                }
            </div>
        );
    }

    const renderBackButton = () => {
        return (
            <div className={styles.menuConatainer}>
                <Button
                    id={'BT_BACK'}
                    size={'lg'}
                    startIcon={<IoIosBackspace />}
                    style={{
                        color: 'black',
                        fontSize: '20px'
                    }}
                    className={styles.buttonBack}
                    onClick={() => navigate(-1)}
                >
                    <p className={styles.textBackButton}>
                        Back
                    </p>
                </Button>
                <InputGroup size={'lg'} className={styles.searchTextField}>
                    <Input
                        id={'TF_SEARCH_VALUE'}
                        placeholder={'Search registered users (Ex. Joker Surasit) . . . '}
                        onChange={onChangeSearchValue}
                        value={searchValue}
                    />
                    <InputGroup.Button
                        id={'IB_CLEAR_VALUE'}
                        onClick={onClickClearValue}
                        disabled={isEmpty(searchValue) && isEmpty(sortColumn)}
                    >
                        <AiOutlineCloseCircle />
                    </InputGroup.Button>
                </InputGroup>
            </div>
        );
    }

    const renderModalChangeSeat = () => {
        return (
            <Modal backdrop={true} keyboard={false} open={open} onClose={handleClose}>
                <Modal.Header className={styles.modalTitle}>
                    <p className={styles.modalTextTitle}>
                        {`Change Seat (${modalSeatId + 1})`}
                    </p>
                    {renderChipStatus(userRegisterAction.getSeatStatusFromSeatID(modalSeatId))}
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <InputGroup size={'md'} className={'mb-3'}>
                        <Input
                            id={'TF_SEARCH_VALUE_MODAL'}
                            placeholder={'Search registered users (Ex. Joker Surasit) . . . '}
                            onChange={onChangeSearchValueModal}
                            value={searchValueModal}
                        />
                        <InputGroup.Button
                            id={'IB_CLEAR_VALUE_MODAL'}
                            onClick={() => setSearchValueModal('')}
                            disabled={isEmpty(searchValueModal)}
                        >
                            <AiOutlineCloseCircle />
                        </InputGroup.Button>
                    </InputGroup>
                    {getDataInModal().length > 0
                        ? <RadioGroup className={styles.groupRadio} name='radio-name-user-change' value={selectUserIdRadio} onChange={setSelectUserIdRadio}>
                            {getDataInModal().map((item: any) => {
                                return (
                                    <Radio className={styles.rowRadio} value={item.id}>{`${item.firstname} ${item.lastname}`}</Radio>
                                )
                            })}
                        </RadioGroup>
                        : <p>Not found data.</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleChangeSeatFromModal} style={styles.modalButtonOk.css}>
                        Change
                    </Button>
                    <Button onClick={handleClose} style={styles.modalButtonCancel.css} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <>
            <CustomAppbar />
            <Container className={styles.container}>
                {renderBackButton()}
                {renderTableRegisteredUser()}
                {renderButtonIconChangeSeat()}
                {renderModalChangeSeat()}
            </Container>
        </>
    );
}

export default RegisterManagement;