import React, {useEffect, useRef, useState} from "react";
import './Header.css'
import exit from '../../assets/icons/exit.svg';
import arrowDown from '../../assets/icons/arrow-down.svg';
import undo from '../../assets/icons/undo.svg';
import redo from '../../assets/icons/redo.svg';
import select from '../../assets/icons/choose.svg';
import add from '../../assets/icons/add.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import rotate from '../../assets/icons/rotate.svg';
import text from '../../assets/icons/text.svg';
import close from '../../assets/icons/close.svg';
import {ButtonIconText} from "../../ui/ButtonIconText/ButtonIconText";
import {fabric} from "fabric";

export const Header = (props) => {
    const { grid } = props
    const [menu, setMenu] = useState(false)
    const [list, setList] = useState([])
    const ref = useRef(null)
    const fileInput = useRef(null)
    const unitScale = 40;

    function exportAllObjects() {
        var objects = grid.getObjects();
        var len = objects.length;
        var list = [];
        for(var i = 0; i < len; i+= 1) {
            var item = objects[i];
            var tmp = {}
            if(item.type === 'rectangle') {
                console.info(item);
                tmp.x = Math.round(item.left) / unitScale;
                tmp.y = Math.round(item.top) / unitScale;
                tmp.w = Math.round(item.width) / unitScale;
                tmp.h = Math.round(item.height) / unitScale;
                tmp.fill = item.fill;
                tmp.id = item.id;
                list.push(tmp);
            }
        }
        // console.info(JSON.stringify(list));
        const blob = new Blob([JSON.stringify(list)])
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "plan.json";
        link.href = url;
        link.click();
        // var zone = document.getElementById('zone');
        // zone.value = JSON.stringify(list);
    }

    function importList(listItems) {
        if(listItems !== undefined) {
            var len = listItems.length;
            for(var i = 0; i< len; i+=1 ){
                var item = listItems[i];
                grid.add(new fabric.Rect({
                    left: item.x * unitScale,
                    top: item.y * unitScale,
                    width: item.w * unitScale,
                    height: item.h * unitScale,
                    type: 'rectangle',
                    fill: item.fill,
                    stroke:'',
                    originX: 'left',
                    originY: 'top',
                    id: item.id !== undefined ? item.id : '',
                    hasControls: true,
                    centeredRotation: true
                }));
            }
            grid.renderAll();
        }
    }

    useEffect(() => {
        const clickOutsideHandler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setMenu(false)
            }
        }
        document.addEventListener('click', clickOutsideHandler, false)
        return () => {
            document.removeEventListener('click', clickOutsideHandler, false)
        }
    }, []);

    const handleFileChange = (e) => {
        // setList(e.target.files);
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            importList(JSON.parse(e.target.result))
        };
    };

    return (
        <div className={'header'} ref={ref}>
            <div className={'header__first'}>
                Планировщик садового участка
                <div>
                    <span>Константин Иванов</span>
                    <img className={'header__icon'} alt={'Выход'} src={exit} />
                </div>
            </div>
            <div className={'header__second'}>
                <span className={'header__second-menu'}>
                    <span className={'button'} onClick={()=>{setMenu(true)}}>Файл <img src={arrowDown} alt={''} /></span>
                    <div className={menu ? 'active' : ''}>
                        <span>Создать новый проект</span>
                        <span onClick={()=>{fileInput.current.click()}}>Открыть проект...</span>
                        <input ref={fileInput} style={{display: 'none'}} accept="application/JSON" type={'file'} onChange={(e)=>handleFileChange(e)}/>
                        <span className={'divider'}></span>
                        <span onClick={()=>{exportAllObjects()}}>Сохранить проект</span>
                        <span>Сохранить проект как...</span>
                    </div>
                </span>
                <div className={'undo-redo'}>
                    <ButtonIconText onClick={()=>{}} title={'Отменить'} icon={undo}/>
                    <ButtonIconText onClick={()=>{}} title={'Повторить'} icon={redo}/>
                </div>
                <div className={'buttons'}>
                    <ButtonIconText onClick={()=>{}} title={'Выделить'} icon={select}/>
                    <ButtonIconText onClick={()=>{}} title={'Добавить'} icon={add}/>
                    <ButtonIconText onClick={()=>{}} title={'Удалить'} icon={deleteIcon}/>
                    <ButtonIconText onClick={()=>{}} title={'Повернуть'} icon={rotate}/>
                    <ButtonIconText onClick={()=>{}} title={'Текст'} icon={text}/>
                </div>
                <div className={'close'}>
                    Закрыть проект
                    <img src={close} alt={''} />
                </div>
            </div>
        </div>
    )
}