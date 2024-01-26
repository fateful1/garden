import React from "react";
import './Objects.css'
import {Object} from "../../ui/Object/Object";
import fields from '../../assets/images/objects/fields.png';
import buildings from '../../assets/images/objects/buildings.png';
import roads from '../../assets/images/objects/roads.png';
import garden from '../../assets/images/objects/garden.png';
import pool from '../../assets/images/objects/pool.png';
import furniture from '../../assets/images/objects/furniture.png';
import other from '../../assets/images/objects/other.png';
import {fabric} from "fabric";


export const Objects = (props) => {
    const { grid } = props;
    console.log(grid)
    function addObjectCanvas(color) {
        var min = 99;
        var max = 9999999;

        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        var id = new Date().getTime() + random;
        grid.add(new fabric.Rect({
            left: 1380,
            top: 690,
            width: 60,
            height: 60,
            type: 'rectangle',
            fill: color,
            stroke:'',
            originX: 'left',
            originY: 'top',
            id: id,
            hasControls: true,
            centeredRotation: true
        }));
    }
    return (
        <div className={'objects'}>
            <Object onClick={()=> addObjectCanvas('green')} icon={fields} title={'Участок'}/>
            <Object onClick={()=>addObjectCanvas('blue')} icon={buildings} title={'Строение'}/>
            <Object onClick={()=>addObjectCanvas('salmon')} icon={roads} title={'Дорожка'}/>
            <Object onClick={()=>addObjectCanvas('green')} icon={garden} title={'Сад и огород'}/>
            <Object onClick={()=>addObjectCanvas('cyan')} icon={pool} title={'Пруды и бассейны'}/>
            <Object onClick={()=>addObjectCanvas('darkorange')} icon={furniture} title={'Мебель'}/>
            <Object onClick={()=>addObjectCanvas('green')} icon={other} title={'Прочее'}/>
        </div>
    )
}