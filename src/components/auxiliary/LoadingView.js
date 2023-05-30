import Spinner from "./Spinner"

function LoadingView() {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <Spinner />
    </div>
  )
}

export default LoadingView