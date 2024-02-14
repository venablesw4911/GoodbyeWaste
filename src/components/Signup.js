export default function Signup(props) {
    return (
        <form className="container">
            <div className="height-row mb-3 w-75 mx-auto">
                <input type="email" className="form-control" id="email" placeholder="Email/Username"/>
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <input type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <input type="password" className="form-control" id="password-confirm" placeholder="Confirm Password"/>
            </div>
            <div className="height-row mb-3 w-75 mx-auto">
                <button className="button-action bg-action text-white form-control">Sign up</button>
            </div>
            <div className="container-fluid w-75">
                <div className="row">
                    <hr className="border-2 col-5 my-auto"/>
                    <p className="col-2 my-auto">OR</p>
                    <hr className="border-2 col-5 my-auto"/>
                </div>
            </div>
            <br/>
            <div className="mb-3 w-75 mx-auto">
                <button className="button-google text-primary form-control">
                    <img className="me-3" src={require("../assets/Google-Logo.png")} alt="Google Logo"/>
                    Sign up with Google
                </button>
            </div>
            <br/>
        </form>
    )
}