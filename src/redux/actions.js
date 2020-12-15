import moment from 'moment';
import axios from '../axios'

export const setUser = (data) => ({
    type:'SET_USER',
    data
})
export const setConversations = (data) => ({
  type:'SET_CONVERSATIONS',
  data
})
export const getUser = (username)=> {
    return async (dispatch, getState)=>{
        try {
          //get user and conversations
          let res = await axios.post('/api/v1/users/me', { username })
          //set user in store
          dispatch(setUser(res.data.me));
          dispatch(setConversations(res.data.conversations));
      
        } catch (error) {
           // dispatch(setFetching(false))
            console.log("error ", error);
        }
    }
}
export const setActiveMessagesId = (data) => ({
  type:'SET_ACTIVE_MESSAGES_ID',
  data
})
export const setActiveMessages = (data) => ({
  type:'SET_ACTIVE_MESSAGES',
  data
})
//these are messages(model)
export const getActiveMessages = (conversation_id)=> {
  
  return async (dispatch, getState)=>{
        try {
          let res = await axios.post('/api/v1/messages' ,{ conversation_id })
          dispatch(setActiveMessages(res.data))
          dispatch(setActiveMessagesId(conversation_id))
        } catch (error) {
          console.log(error);
        }
  }
}
//set notMe in redux
export const setInconversationWith = (data = '') => ({
  type:'SET_IN_CONVERSATION_WITH',
  data
})
export const addMessage = (data) => ({
  type:'ADD_MESSAGE',
  data
})

export const edit = (data) => {

  return {
    type:'EDIT_MESSAGE',
    data
  }
}
export const toggleEditMessageConfirmed = (data) => ( 
  {
    type:'TOGGLE_EDIT_MESSAGE_CONFIRMED',
    data
}
)
export const resetEdit = () => ({ type:'RESET_EDIT' })

export const setEditedMessage = (data) => ({
  type:'SET_EDITED_MESSAGE',
  data
})
