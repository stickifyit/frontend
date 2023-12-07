import { BackendHost } from "@/constant/backend";
import axios from "axios";

export default axios.create({
    baseURL: BackendHost,
})