import { useEffect, useState } from 'react';
import { Button, Container, Grid, Input, InputGroup, Modal, Row } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { FaPhoneAlt } from '@react-icons/all-files/fa/FaPhoneAlt';
import { themes } from '../constants/themes';
import { isEmpty, isNotPhoneNumber } from '../constants/validate';
import { useRegisterationContext } from '../contexts/registration';
import { useNavigate } from 'react-router-dom';
import routes from '../constants/routes';
import CustomAppbar from '../components/CustomAppbar';

const styles = {
    container: `${themes.bg} min-h-screen flex flex-col justify-center items-center p-6 static pt-20`,
    cardField: `bg-white ${themes.card} w-full max-w-md p-6`,
    cardItem: `bg-white ${themes.card} xs:w-full sm:w-52 py-3 flex flex-col justify-center items-center xs: mb-6 sm:mb-0`,
    cardItemClick: `bg-white ${themes.card} xs:w-full sm:w-52 py-3 flex flex-col justify-center items-center xs: mb-6 sm:mb-0 cursor-pointer hover:opacity-90`,
    rowTotal: `max-w-md w-full sm:mb-6 flex xs:flex-col sm:flex-row xs:justify-center sm:justify-between items-center`,
    rowTextField: 'mb-4 px-6',
    rowButton: 'px-6 flex justify-center items-center',
    textTotalDes: `m-0 font-bold px-3 mb-2 text-base text-center`,
    textTotalValue: `m-0 font-bold px-3 text-2xl text-center`,
    button: {
        css: { backgroundColor: '#35C184', color: 'white', fontWeight: 'bold' },
        tailwind: 'w-40'
    },
    titleForm: 'mb-4 px-6 text-xl font-bold text-black',
    titleFullSeat: 'px-6 text-md font-bold text-red-500 text-center',
    modalBody: 'flex flex-col justify-center items-center',
    modalFooter: 'flex justify-center items-center',
    modalTitle: 'font-bold mb-2 text-lg text-black',
    modalDes: 'text-md',
    modalButton: {
        css: { backgroundColor: 'gray', color: 'white', fontWeight: 'bold' },
        tailwind: 'w-36'
    },
}

const TEXT_ERROR = {
    FIRSTNAME: 'Please enter your firstname correctly.',
    LASTNAME: 'Please enter your lastname correctly.',
    PHONE_NO: 'Please enter your phone number correctly.',
}

function Register() {
    const { userRegisterAction } = useRegisterationContext();
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const [firstnameStatusError, setFirstnameStatusError] = useState<boolean>(false);
    const [lastnameStatusError, setLastnameStatusError] = useState<boolean>(false);
    const [phoneNumberStatusError, setPhoneNumberStatusError] = useState<boolean>(false);

    // MODAL STATUS REGISTER USER
    const [open, setOpen] = useState<boolean>(false);
    const [typeModal, setTypeModal] = useState<'ERROR' | 'SUCCESS'>('SUCCESS');
    const [errorDesModal, setErrorDesModal] = useState<string>('')

    useEffect(() => {

    }, []);

    const validateRegister = () => {
        let result = true;
        resetErrorTextfield();
        if (isEmpty(firstname)) {
            setFirstnameStatusError(true);
            result = false;
        }
        if (isEmpty(lastname)) {
            setLastnameStatusError(true);
            result = false;
        }
        if (isEmpty(phoneNumber) || (!isEmpty(phoneNumber) && isNotPhoneNumber(phoneNumber))) {
            setPhoneNumberStatusError(true);
            result = false;
        }
        return result;
    }

    const onClickRegister = () => {
        if (validateRegister()) {
            const result = userRegisterAction.registerUser(
                {
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    phoneNumber: phoneNumber.trim()
                }
            );
            if (isEmpty(result)) {
                setTypeModal('SUCCESS');
                setOpen(true);
            } else {
                setTypeModal('ERROR');
                setErrorDesModal(result);
                setOpen(true);
            }
        }
    }

    const resetTextfieldValue = () => {
        setFirstname('');
        setLastname('');
        setPhoneNumber('');
    }

    const resetErrorTextfield = () => {
        setFirstnameStatusError(false);
        setLastnameStatusError(false);
        setPhoneNumberStatusError(false);
    }

    const onChangeFirstname = (val: string, e: any) => {
        setFirstname(val);
        setFirstnameStatusError(false);
    }

    const onChangeLastname = (val: string, e: any) => {
        setLastname(val);
        setLastnameStatusError(false);
    }

    const onChangePhoneNumber = (val: string, e: any) => {
        setPhoneNumber(val);
        setPhoneNumberStatusError(false);
    }

    const handleCloseModalRegisterSuccess = () => {
        setOpen(false);
        resetTextfieldValue();
    }

    const handleCloseModalRegisterError = () => {
        setOpen(false);
    }

    const handleClickTotalUserRegister = () => {
        navigate(routes.listUser.url);
    }

    const renderTotalCard = (text: string, value: string | number, color: string, onClick?: () => void) => {
        return (
            <div className={onClick ? styles.cardItemClick : styles.cardItem} onClick={onClick}>
                <p className={styles.textTotalDes}>{text}</p>
                <p className={styles.textTotalValue + ` ${color}`}>{value}</p>
            </div>
        );
    }

    const renderRowTextField = (type: string, placeholder: string, value: string, onchange: (value: string, event: any) => void, textError: string, statusError: boolean, icon: any, disabled: boolean) => {
        return (
            <Row className={styles.rowTextField}>
                <InputGroup size={'lg'}>
                    <InputGroup.Addon>
                        {icon}
                    </InputGroup.Addon>
                    <Input
                        disabled={disabled}
                        id={'TF_' + placeholder.toUpperCase()}
                        placeholder={placeholder}
                        value={value}
                        type={type}
                        onChange={onchange}
                    />
                </InputGroup>
                <p className={`${themes.textError} ${statusError ? '' : 'hidden'}`}>
                    {textError}
                </p>
            </Row>
        );
    }

    const renderRowTotal = () => {
        return (
            <div className={styles.rowTotal}>
                {renderTotalCard('Total User Register', userRegisterAction.getTotalUserRegister(), 'text-red-600', handleClickTotalUserRegister)}
                {renderTotalCard('Remaining Seat', userRegisterAction.getRemainingSeat(), 'text-blue-500')}
            </div>
        );
    }

    const renderCardTextfield = () => {
        return (
            <Grid className={styles.cardField}>
                <p className={styles.titleForm}>
                    Registration Information
                </p>
                {renderRowTextField(
                    'text',
                    'Firstname',
                    firstname,
                    onChangeFirstname,
                    TEXT_ERROR.FIRSTNAME,
                    firstnameStatusError,
                    <AvatarIcon />,
                    userRegisterAction.isFullSeat()
                )}
                {renderRowTextField(
                    'text',
                    'Lastname',
                    lastname,
                    onChangeLastname,
                    TEXT_ERROR.LASTNAME,
                    lastnameStatusError,
                    <AvatarIcon />,
                    userRegisterAction.isFullSeat()
                )}
                {renderRowTextField(
                    'text',
                    'Phone Number',
                    phoneNumber,
                    onChangePhoneNumber,
                    TEXT_ERROR.PHONE_NO,
                    phoneNumberStatusError,
                    <FaPhoneAlt />,
                    userRegisterAction.isFullSeat()
                )}
                <Row className={styles.rowButton}>
                    {userRegisterAction.isFullSeat()
                        ? <p className={styles.titleFullSeat}>
                            The seat is now full.
                        </p>
                        : <Button
                            style={styles.button.css}
                            className={styles.button.tailwind}
                            onClick={onClickRegister}
                        >
                            Register
                        </Button>
                    }
                </Row>
            </Grid>
        );
    }

    const renderModalRegister = () => {
        if (typeModal === 'SUCCESS') {
            return (
                <Modal backdrop={true} keyboard={false} open={open} onClose={handleCloseModalRegisterSuccess}>
                    <Modal.Body className={styles.modalBody}>
                        <p className={styles.modalTitle}>Successful Registration</p>
                        <p className={styles.modalDes}>{`Registrant : ${firstname.trim()} ${lastname.trim()} (${phoneNumber.trim()})`}</p>
                    </Modal.Body>
                    <Modal.Footer className={styles.modalFooter}>
                        <Button
                            style={styles.modalButton.css}
                            className={styles.modalButton.tailwind}
                            onClick={handleCloseModalRegisterSuccess}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        } else if (typeModal === 'ERROR') {
            return (
                <Modal backdrop={true} keyboard={false} open={open} onClose={handleCloseModalRegisterError}>
                    <Modal.Body className={styles.modalBody}>
                        <p className={styles.modalTitle}>Registration failed</p>
                        <p className={styles.modalDes}>{errorDesModal}</p>
                    </Modal.Body>
                    <Modal.Footer className={styles.modalFooter}>
                        <Button
                            style={styles.modalButton.css}
                            className={styles.modalButton.tailwind}
                            onClick={handleCloseModalRegisterError}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }

    return (
        <>
            <CustomAppbar />
            <Container className={styles.container}>
                {renderRowTotal()}
                {renderCardTextfield()}
                {renderModalRegister()}
            </Container>
        </>
    );
}

export default Register;