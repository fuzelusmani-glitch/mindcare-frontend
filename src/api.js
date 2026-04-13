// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://mindcare-backend-71f2.onrender.com/",
});

export default API;