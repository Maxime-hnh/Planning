import React from 'react';
import { toast } from 'react-toastify';


export const toastNotif = (values) => {
    toast(values);
};

export const toastSuccess = (values) => {
    toast.success(values, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        newestOnTop: true
    });
};
export const toastInfo = (values) => {
    toast.info(values, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        newestOnTop: true,
        pauseOnFocusLoss:false
    });
};

export const toastError = (values) => {
    toast.error(values, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        newestOnTop: true
    });
};