// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://mindcare-backend-s8pc.onrender.com/api",
  headers:{
    "Content-type":"application/json",
  },
});

export default API;