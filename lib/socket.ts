
import { BackendHost } from "@/constant/backend"
import * as io from "socket.io-client"
export default io.connect(BackendHost)