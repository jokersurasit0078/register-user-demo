/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import { node } from 'prop-types';

export interface IUserRegisterSentState {
    firstname: string;
    lastname: string;
    phoneNumber: string;
}

export interface IUserRegisterState {
    id: number;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    timestamp: number | string;
    seat: number;
}

export interface ISeatState {
    seatId: number;
    status: boolean;
}

const RegisterationContext = createContext<any>({});

export function useRegisterationContext() {
    return useContext(RegisterationContext);
}

const mock = [
    { id: 0, firstname: 'Surasit', lastname: 'Suwannara', phoneNumber: '0872237007', timestamp: new Date().toLocaleString('th'), seat: 0 },
    { id: 1, firstname: 'Joker', lastname: 'Suwannara', phoneNumber: '0872237007', timestamp: new Date().toLocaleString('th'), seat: 1 }
]

function RegisterationProvider({ children }: any) {
    const [userRegister, setUserRegister] = useState<Array<IUserRegisterState>>(mock);
    const [seatData, setSeatData] = useState<Array<ISeatState>>([]);
    const [maxRegister, setMaxRegister] = useState<number>(20);

    useEffect(() => {
        createSeat();
    }, []);

    const createSeat = () => {
        const newSeat: Array<ISeatState> = [];
        for (let i = 0; i < maxRegister; i++) {
            newSeat.push({ seatId: i, status: i === 0 || i === 1 ? true : false });
        }
        setSeatData(newSeat);
    }

    const checkRegistered = (value: IUserRegisterSentState) => {
        let result = true;
        for (let i = 0; i < userRegister.length; i++) {
            const item = userRegister[i].firstname + ' ' + userRegister[i].lastname;
            const itemValue = value.firstname + ' ' + value.lastname;
            if (itemValue === item) {
                result = false;
                break;
            }
        }
        return result;
    }

    const getMinSpaceSeat = () => {
        return seatData.findIndex(item => !item.status);
    }

    function registerUser(value: IUserRegisterSentState) {
        if (checkRegistered(value)) {
            const indexSeat = getMinSpaceSeat();
            const newItemUserRegister: IUserRegisterState = {
                id: userRegister.length,
                firstname: value.firstname,
                lastname: value.lastname,
                phoneNumber: value.phoneNumber,
                timestamp: new Date().toLocaleString('th'),
                seat: indexSeat
            }
            const newUserRegister = userRegister;
            newUserRegister.push(newItemUserRegister);
            setUserRegister(newUserRegister);
            setStatusOfSeat(indexSeat, true);
            return '';
        } else {
            return 'You are already listed on the registration list.'
        }
    }

    function getTotalUserRegister() {
        return userRegister.length;
    }

    function getRemainingSeat() {
        return maxRegister - userRegister.length;
    }

    function getUserDataFromSeatID(index: number) {
        debugger;
        if (userRegister.length > 0) {
            return userRegister[userRegister.findIndex(item => item.seat === index)];
        } else return {};
    }

    function getSeatStatusFromSeatID(index: number) {
        if (seatData.length > 0) {
            return seatData[index].status;
        } else return false;
    }

    function changeMaxRegister(value: number) {
        if (value > 0 && value < 1000) {
            setMaxRegister(value);
        }
    }

    function isFullSeat() {
        return userRegister.length >= maxRegister;
    }

    function setStatusOfSeat(index: number, status: boolean) {
        seatData[index].status = status;
    }

    function changeSeat(seatIdSelect: number, userIdRadio: number) {
        const oldSeatIdOfUserIdRadio = userRegister[userIdRadio].seat;
        if (getSeatStatusFromSeatID(seatIdSelect)) {
            const userDataSeatIdSelect: any = getUserDataFromSeatID(seatIdSelect);
            userRegister[userDataSeatIdSelect.id].seat = oldSeatIdOfUserIdRadio; // เปลี่ยนที่นั่งของคนที่นั่งตีวที่เลือกให้ไปนั่งที่เก่าของคนที่เราเลือก
            userRegister[userIdRadio].seat = seatIdSelect; // เปลี่ยนที่นั่งของคนที่เราเลือกมานั่งตรงที่เราเลือก
        } else {
            setStatusOfSeat(oldSeatIdOfUserIdRadio, false); // เปลี่ยน status ที่เก่าของ user ที่เลือกให้เป็นที่นั่งว่าง
            userRegister[userIdRadio].seat = seatIdSelect; // เปลี่ยนเลขที่นั่งของ user ที่เลือก
            setStatusOfSeat(seatIdSelect, true); // เปลี่ยน status ที่ใหม่ของ user ให้เป็นนั่งแล้ว
        }
    }

    function deleteUserRegiter(modalSeatId: number) {
        // debugger;
        // console.log('modalSeatId : ', modalSeatId);
        if (getSeatStatusFromSeatID(modalSeatId) && userRegister.length > 0) {
            const userDataSeatIdSelect: any = getUserDataFromSeatID(modalSeatId);
            let newUserRegister: Array<IUserRegisterState> = [];
            for (let i = 0; i < userRegister.length; i++) {
                // console.log(`${userRegister[i].seat} !== ${userDataSeatIdSelect.seat}`);
                if (userRegister[i].seat !== userDataSeatIdSelect.seat) {
                    newUserRegister.push(userRegister[i]);
                }
            }
            console.log(newUserRegister);
            // userRegister = newUserRegister
            setUserRegister(newUserRegister);
            setStatusOfSeat(modalSeatId, false);
            // console.log('userRegister : ', userRegister);
            // console.log('newUserRegister : ', newUserRegister);
            return newUserRegister;
        }
        return userRegister;
    }

    function getUserRegisterData() {
        return userRegister;
    }

    const userRegisterStore = {
        seatData,
        userRegister,
        userRegisterAction: {
            registerUser,
            getTotalUserRegister,
            getRemainingSeat,
            changeMaxRegister,
            isFullSeat,
            getUserDataFromSeatID,
            getSeatStatusFromSeatID,
            setStatusOfSeat,
            changeSeat,
            deleteUserRegiter,
            getUserRegisterData
        }
    }

    return (
        <RegisterationContext.Provider value={userRegisterStore}>
            {children}
        </RegisterationContext.Provider>
    )
}

RegisterationProvider.propTypes = {
    children: node.isRequired
}

export default RegisterationProvider;