import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import {eventClearActiveEvent, eventStartAddNew, eventStartUpdated} from '../../actions/event';


import moment from 'moment'
import { uiCloseModal } from '../../actions/ui';

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
Modal.setAppElement('#root');
const now= moment().minute(0).second(0).add(1, 'hours');
const end2= now.clone().add(1, 'hours');

const initEvent={
        title:'',
        notes:'',
        start:now.toDate(),
        end: end2.toDate()
    }

export const CalendarModal = () => {
    const dispatch= useDispatch();
    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvent} = useSelector(state => state.calendar)



    const [dateStart, setdateStart] = useState(now.toDate());
    const [dateEnd, setdateEnd] = useState(end2.toDate());
    const [tituloValido, settituloValido] = useState(true)
 

    const [formValues, setformValues] = useState(initEvent);

    const {notes,title, start, end}= formValues;

    useEffect(() => {
        if(activeEvent){
            setformValues(activeEvent);
        } else{
            setformValues(initEvent);
        }
    }, [activeEvent, setformValues])

    const handleInputChangue=({target})=>{

        setformValues({
            ...formValues,
            [target.name]: target.value

        })
    }


    const closeModal=()=>{
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent())
        setformValues(initEvent);

        
    }

    const handleStartDateChangue =(e)=>{
         setdateStart(e);
         setformValues({
            ...formValues,
            start:e
        })
         
         //handleEndDateChangue(e)

    }

    const handleEndDateChangue=(e)=>{
        setdateEnd (e);
        setformValues({
            ...formValues,
            end:e
        })
    }

    const handleSubmitForm=(e)=>{
        e.preventDefault();
        const momentStart= moment(start);
        const momentEnd= moment(end)

        if(momentStart.isSameOrAfter(momentEnd)){
          return  Swal.fire('Error', 'La fecha  fin debe ser mayor a la fecha de inicio', 'error');
        }
        if(title.trim().length<2){
            return settituloValido(false);
        }

        if(activeEvent){
            dispatch(eventStartUpdated(formValues));

        }
        else{
            dispatch(eventStartAddNew(formValues));
        }
   
    
        settituloValido(true);
        closeModal();
    
        
    }

    return (
    <Modal
        isOpen={modalOpen}
       // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <h1> {(activeEvent) ? 'Editar evento': 'Nuevo Evento'} </h1>
        <hr />
        <form className="container" onSubmit={handleSubmitForm}>

            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker
                        onChange={handleStartDateChangue}
                        value={dateStart}
                        className="form-control"
                 />          
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker
                        onChange={handleEndDateChangue}
                        value={dateEnd}
                        className="form-control"
                        minDate={dateStart}
                 />  
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={ `form-control ${ !tituloValido && 'is-invalid' } `}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={ handleInputChangue }

                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={notes}
                    onChange={handleInputChangue}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
            </Modal>
    )
}
