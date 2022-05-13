import axios from "axios";

const ClientAPI = axios.create({
  baseURL: "http://localhost:5000/",
});

export default ClientAPI;
