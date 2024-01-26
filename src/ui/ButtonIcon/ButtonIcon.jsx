import React from "react";
import './ButtonIcon.css'

export const ButtonIcon = (props) => {
    const {onClick, icon} = props
    return (
        <div className={'buttonIcon'} onClick={onClick}>
            <img src={icon} alt={''}/>
        </div>
    )
}