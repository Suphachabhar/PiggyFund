import React from 'react';
import { notification } from 'antd';
import './Progress.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

export const Budget = ({ budget }) => {
    function progress(budget) {
        if (budget.Progress < 1) {
            return (<div className="progress" style={{ width: 100 * budget.Progress + "%" }}></div>);
        } else {
            return (<div className="progress_exceeded"></div>);
        }
    };

    function deleteBudget(id) {
        fetch(`http://be-4920.herokuapp.com/deletebudget?id=${id}`)
            .then(console.log('delete', id))
            .catch(error =>
                console.log(error)
            );
    };

    function openNotificationWithIcon(type) {
        notification[type]({
            message: 'Delete',
            description:
                'Delete Budget Successfully',
        });
    };

    return (
        <>
            <li className="budgetBox">
                <div className="budgetInfo">
                    {budget.Category}
                    <span >${budget.Spent}/${budget.newAmount} ({(100 * budget.Progress).toFixed(2) + '%'})</span>
                    <DeleteOutlineIcon 
                        style={{ color: '#c0392b', fontSize: 24 }}
                        onClick={() => { deleteBudget(budget._id); openNotificationWithIcon('warning') }}
                    />
                </div>
                <div className="tooltip">
                    <div className="progressBar">
                        {progress(budget)}
                        <span class="tooltiptext">{budget.alert}</span>
                    </div>
                </div>
            </li>
        </>
    );
}
