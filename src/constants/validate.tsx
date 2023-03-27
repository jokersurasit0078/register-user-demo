export const isEmpty = (value: any) => {
    return value === '' || value === null || value === undefined;
}

export const isNotPhoneNumber = (value: string) => {
    return !(/^[0-9#+-]*$/.test(value));
}