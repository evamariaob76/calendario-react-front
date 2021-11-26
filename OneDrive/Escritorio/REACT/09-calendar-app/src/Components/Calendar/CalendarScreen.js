import React, { useEffect, useState } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { messages } from '../../helpers/calendar-messages-es';
import { NavBar } from '../Ui/NavBar';
import { CalendarEvent } from './CalendarEvent';
import { useDispatch, useSelector } from 'react-redux'


import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/event';
import { AddNewFab } from '../Ui/AddNewFab';
import { DeleteEventFab } from '../Ui/DeleteEventFab';

moment.locale('es');


const localizer = momentLocalizer(moment) // or globalizeLocalizer


export const CalendarScreen = () => {        
    const dispatch= useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);   

    //const {state} = useSelector(state => state.calendar.events);   

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        dispatch(eventStartLoading())
        
    }, [dispatch])

    const onDoubleClick = (e)=>{
        //dispatch(eventSetActive(e));
        dispatch(uiOpenModal());
      
        }

    const onSelectEvent = (e)=>{
        dispatch(eventSetActive(e));

    }

    const onViewChange =(e)=>{
        setLastView(e)
        localStorage.setItem('lastView', e);

    }

    const onSelectSlot=(e)=>{
        dispatch(eventClearActiveEvent())

    }

    const eventStyleGetter=(event, start, end, isSelected)=>{

        const style={
            backgroundColor: (uid ===event.user._id)?'#367CF7' : '#465660',
            borderRadius: '0px',
            opacity:0.8,
            dispplay:'block',
            color:'white',
    
        }
        return {style}
    }

    return (
        <div className="calendar-screen">
            <NavBar/>
             <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick} 
                onSelectEvent={onSelectEvent}   
                onView={onViewChange}  
                components={{event: CalendarEvent}}
                view={lastView}
                onSelectSlot={onSelectSlot}
                selectable={true}

                />
            <CalendarModal/>

        {      activeEvent &&
             < DeleteEventFab/>    
        }  
      <AddNewFab/>
            
        </div>
    )
}
