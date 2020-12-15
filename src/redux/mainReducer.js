  //Set Api url
  let url;
  if(window.location.href.includes('localhost')) {
      url = process.env.REACT_APP_API_URL_LOCAL
  } else {
      url = process.env.REACT_APP_API_URL_HEROKU
  }
  
  export const defaultState = {
    user: {},
    inConversationWith: '',
    conversations: [],
    activeMessages: [],
    activeMessagesId: 0,
    editMessage: undefined,
    editMessageConfirmed: false,
    api_url: url
  };
  
  export const mainReducer = (state = defaultState, { type, data }) => {
      switch (type) {
          case 'SET_USER':
            return {...state, user: data}
          case 'SET_IN_CONVERSATION_WITH':
            return {...state, inConversationWith: data}
          case 'SET_CONVERSATIONS':
            return {...state, conversations: data}
          case 'SET_ACTIVE_MESSAGES':
            return {...state, activeMessages: data}
          case 'SET_ACTIVE_MESSAGES_ID':
            return {...state, activeMessagesId: data }
           case 'ADD_MESSAGE':
            return {...state, activeMessages: [...state.activeMessages, data] }
          case 'EDIT_MESSAGE':
            return {...state, editMessage: data }
          case 'RESET_EDIT':
            return {...state, editMessage: undefined }
          case 'TOGGLE_EDIT_MESSAGE_CONFIRMED':
            if(data) return {...state, editMessageConfirmed: data}
            return {...state, editMessageConfirmed: !state.editMessageConfirmed }
          case 'SET_EDITED_MESSAGE':
            const editedActiveMessages = state.activeMessages.map( (message) =>{
              if(data.message_id === message._id){
                return {...message, ...data}
              }
              return message
            })
            return {...state, activeMessages: editedActiveMessages}
          default:
            return state;
      }
  
  };
  