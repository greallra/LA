import axios from 'axios';
//REACT_APP_API_URL_HEROKU
//REACT_APP_API_URL_LOCAL

//any request with axios will use this url
let url;
if(window.location.href.includes('localhost')) {
    url = process.env.REACT_APP_API_URL_LOCAL
} else {
    url = process.env.REACT_APP_API_URL_HEROKU
}
const instance = axios.create({
    baseURL: url
})


export default instance;