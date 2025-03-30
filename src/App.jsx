import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen px-5 max-md:py-8">
      <Toaster/>
      <Outlet/>
    </div>
  )
}

export default App
