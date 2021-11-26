import { types } from "../types/types";
/*
{
    id:'hdsdkjdh
    title: 'Cumpleaños',
    start: moment().toDate(),
    end: moment().add(2,'hours').toDate(),
    user:{
        _id:'123',
        name:'fernando'
            }    
    }*/


const initialStete={
    id:new Date().getTime(),
    events:[],
    activeEvent: null

};

export const calendarReducer=(state=initialStete, action)=>{

    switch (action.type) {
        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:

            return{
                ...state,
                events:[
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventClaearActiveEvent:
            return{
                ...state,
                activeEvent:null
            }    
        case types.eventUpdated:
            return{
                ...state,
               events:state.events.map(
                   e=>(e.id ===action.payload.id)? action.payload:e
               )
            }     
        case types.eventDeleted:
            return{
                ...state,
               events:state.events.filter(
                   e=>(e.id !==state.activeEvent.id)
               ),
               activeEvent:null
            }   
        case types.eventLoaded :
            return {
                ...state,
                events: [...action.payload]

            }    
        case types.eventLogout :
            return {
                ...initialStete

            }                  
      
    
        default:
            return state;
    }
}