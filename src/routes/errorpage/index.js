import {h} from 'preact';
function ErrorPage() {
  return(
    <div className="vh-100 flex justify-center items-center bg-primary white">
      <div className="mw7 f4 tc">
        <h1 className="lh-title">Maaf...</h1>
        <p className="serif">Halaman ini belum tersedia pada saat kompetisi berlangsung</p>
      </div>
    </div>
  )
}

export default ErrorPage
