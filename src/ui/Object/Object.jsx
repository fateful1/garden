import React from "react";
import './Object.css';

export const Object = (props) => {
    const {onClick, icon, title} = props;
    return (
        <div className={'object'} onClick={onClick}>
            <img src={icon} alt={''}/>
            {title}
        </div>
    )
}