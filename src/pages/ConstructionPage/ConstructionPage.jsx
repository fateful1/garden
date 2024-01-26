import React, {useRef, useState} from "react";
import {Header} from "../../components/Header/Header";
import {LeftPanel} from "../../components/LeftPanel/LeftPanel";
import {RightPanel} from "../../components/RightPanel/RightPanel";
import {MainGrid} from "../../components/MainGrid/MainGrid";
import {Footer} from "../../components/Footer/Footer";
import add from '../../assets/icons/add.svg';
import folder from '../../assets/icons/folder.svg';
import Modal from 'react-modal';
import {fabric} from "fabric";

export const ConstructionPage = () => {
    const [isOpen, setIsOpen] = useState(true)
    const [grid, setGrid] = useState('')
    const fileInput = useRef(null)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function importList(listItems) {
        const unitScale = 40;
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
                    fill: '#fab',
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

    const handleFileChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            importList(JSON.parse(e.target.result))
        };
    };

    return (
        <div className={'construction'}>
            <Header grid={grid}/>
            <LeftPanel/>
            <RightPanel grid={grid}/>
            <MainGrid setGrid={setGrid}/>
            <Footer/>
            <Modal
                isOpen={isOpen}
                // style={{zIndex: '10000'}}
                style={customStyles}
                ariaHideApp={false}
            >
                <h2 className={'modal__h2'}>Начало работы</h2>
                <div className={'modal__buttons'}>
                    <span onClick={()=>setIsOpen(false)}>
                        <img src={add} alt={''}/>
                        Создать проект участка
                    </span>
                    <span onClick={()=>{ fileInput.current.click(); setIsOpen(false)}}>
                        <input ref={fileInput} style={{display: 'none'}} accept="application/JSON" type={'file'}
                               onChange={(e) => handleFileChange(e)}/>
                        <img src={folder} alt={''}/>
                        Открыть сохраненный проект
                    </span>
                </div>
            </Modal>
        </div>
    )
}
