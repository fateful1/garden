import React from "react";
import './LeftPanel.css';
import copy from '../../assets/icons/copy.svg';
import paste from '../../assets/icons/paste.svg';
import group from '../../assets/icons/group.svg';
import zoom from '../../assets/icons/zoom.svg';
import rotateIcon from '../../assets/icons/rotateIcon.svg';
import mirror from '../../assets/icons/mirror.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import {ButtonIcon} from "../../ui/ButtonIcon/ButtonIcon";

export const LeftPanel = () => {
    return (
        <div className={'leftPanel'}>
            <ButtonIcon onClick={()=>{}} icon={copy}/>
            <ButtonIcon onClick={()=>{}} icon={paste}/>
            <ButtonIcon onClick={()=>{}} icon={group}/>
            <ButtonIcon onClick={()=>{}} icon={zoom}/>
            <ButtonIcon onClick={()=>{}} icon={rotateIcon}/>
            <ButtonIcon onClick={()=>{}} icon={mirror}/>
            {/*<ButtonIcon onClick={()=>{}} icon={''}/>*/}
            <ButtonIcon onClick={()=>{}} icon={deleteIcon}/>
        </div>
    )
}