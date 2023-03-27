import { useEffect, useState } from 'react';
import { Button, Container, Input, InputGroup, Table } from 'rsuite';
import { themes } from '../constants/themes';
import { useRegisterationContext } from '../contexts/registration';
import { IoIosBackspace } from '@react-icons/all-files/io/IoIosBackspace';
import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from '../constants/validate';
import CustomAppbar from '../components/CustomAppbar';

const styles = {
    container: `${themes.bg} min-h-screen flex flex-col justify-center items-center p-6 static pt-20`,
    cardTable: `bg-white ${themes.card} w-full min-w-sm max-w-3xl py-6`,
    titleForm: 'mb-4 px-6 text-xl font-bold text-black',
    tableHeader: `font-bold text-black`,
    menuSearchConatainer: `max-w-3xl w-full mb-6 flex xs:flex-col sm:flex-row xs:justify-center sm:justify-between xs:items-start, sm:items-center`,
    backButtonConatainer: `max-w-3xl w-full mt-6 flex xs:flex-col sm:flex-row xs:justify-center sm:justify-between xs:items-start, sm:items-center`,
    searchTextField: `${themes.card} xs:mt-3 sm:mt-0`,
    buttonBack: `${themes.card} sm:mr-6 xs:w-20 sm: w-full`,
    textBackButton: 'font-bold text-black text-sm',
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

function ListUser() {
    const { userRegister } = useRegisterationContext();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState<string>('');
    const [dataUserFilter, setDataUserFilter] = useState<any>(userRegister);
    const [sortColumn, setSortColumn] = useState<any>();
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
    const [loading, setLoading] = useState<boolean>(false);

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

    const renderTableRegisteredUser = () => {
        return (
            <div className={styles.cardTable}>
                <p className={styles.titleForm}>
                    List of registered users
                </p>
                <Table
                    bordered
                    height={400}
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

    const renderSearchValue = () => {
        return (
            <div className={styles.menuSearchConatainer}>
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

    const renderBackButton = () => {
        return (
            <div className={styles.backButtonConatainer}>
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
            </div>
        );
    }

    return (
        <>
            <CustomAppbar />
            <Container className={styles.container}>
                <CustomAppbar />
                {renderSearchValue()}
                {renderTableRegisteredUser()}
                {renderBackButton()}
            </Container>
        </>
    );
}

export default ListUser;