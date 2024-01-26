import React from "react";
import './ButtonIconText.css'

export const ButtonIconText = (props) => {
    const {onClick, title, icon} = props
    return (
        <div className={'buttonIconText'} onClick={onClick}>
            <img src={icon} alt={''}/>
            {title}
        </div>
    )
}