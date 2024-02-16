export default function Login(props) {
    return (
        <form className="container">
            <div className="height-row mb-3 w-75 mx-auto">
                <input type="email" className="form-control" id="email" placeholder="Email/Username"/>
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <input type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <button className="button-action bg-action text-white form-control">Log In</button>
            </div>
            <div className="height-row mb-3 w-75 mx-auto text-start row">
                <div className="col-md-6 text-center text-md-start">
                    <input className="me-md-3" type="checkbox" id="remember" name="remember"/>
                    <label className="h6" htmlFor="remember">Remember Password</label>
                </div>
                <div className="col-md-6 text-center">
                    <a className="link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover float-md-end h6">
                        Forgot Password
                    </a>
                </div>
            </div>
            <div className="container-fluid w-75">
                <div className="row">
                    <hr className="border-2 col-4 col-md-5 my-auto"/>
                    <p className="col-4 col-md-2 my-auto">OR</p>
                    <hr className="border-2 col-4 col-md-5 my-auto"/>
                </div>
            </div>
            <br/>
            <div className="mb-3 w-75 mx-auto">
                <button className="button-google text-primary form-control">
                    <img className="me-3" src={require("../assets/Google-Logo.png")} alt="Google Logo"/>
                    Sign in with Google
                </button>
            </div>
            <br/>
        </form>
    )
}