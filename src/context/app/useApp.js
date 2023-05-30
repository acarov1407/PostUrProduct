import { useContext } from "react"
import AppContext from "./AppProvider"

function useApp() {
  return useContext(AppContext);
}

export default useApp