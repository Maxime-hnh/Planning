import React from 'react';
import { toastError, toastInfo } from '../Components/Hooks/Toast';


export const Dashboard = () => {

    return (
        <div>
            <button onClick={(() => {toastError('😓😓 Une erreur est survenue ')})}>Notify !</button>
        </div>
    );
}