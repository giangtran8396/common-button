import React from "react";
import { CheckBoxIcon } from "../CheckBoxIcon";
import classes from './CheckBox.module.css';
import classnames from 'classnames';


interface Props {
    children?: React.ReactNode;
    checked?: boolean;
}
export function CheckBox({children, checked}: Props) {
    return (
        <div className={classes['root']}>
            <div className={classes['wrap']}>
                <input id="default-checkbox" type="checkbox" value="" className={classnames(classes['input'], checked && classes['input-checked'])} />
                {checked && <CheckBoxIcon />}
            </div>
            <label htmlFor="default-checkbox" className={classes['label']}>{children}</label>
        </div>
    )
}

