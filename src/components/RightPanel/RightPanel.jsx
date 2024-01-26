import React, {useState} from "react";
import './RightPanel.css';
import Tabs from "../../ui/Tabs/Tabs";
import {Objects} from "../Objects/Objects";
import {Features} from "../Features/Features";

export const RightPanel = (props) => {
    const { grid } = props;
    const [characteristicsIsOpen, setCharacteristicsIsOpen] = useState(true);

    return (
        <div className={'rightPanel'}>
            <Tabs
                options={['Объекты','Свойства']}
                onClick={()=>{setCharacteristicsIsOpen(!characteristicsIsOpen)}}
                tabClassName={'rightPanel__tab'}
                animationTabClassName={'rightPanel__tab active'}
                optionsClassName={'rightPanel__tab-option'}
            />
                {characteristicsIsOpen ?
                    <Objects grid={grid}/>
                    :
                    <Features/>
                }
        </div>
    )
}