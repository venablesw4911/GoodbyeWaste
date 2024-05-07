export default function Footer(props) {
    return (
      <footer className="position-absolute w-100 footer-bg top-90 py-3" style={{ zIndex: -2 }}>
          <hr/>
          <ul className="nav justify-content-center pb-3 mb-3">
              <li className="nav-item">
                  <a href="#" className="footer-text px-2 link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover">Home</a>
              </li>
              <li className="nav-item">
                  <a href="#" className="footer-text px-2 link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover">Features</a>
              </li>
              <li className="nav-item">
                  <a href="#" className="footer-text px-2 link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover">FAQs</a>
              </li>
              <li className="nav-item">
                  <a href="#" className="footer-text px-2 link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover">About Us</a>
              </li>
              <li className="nav-item">
                  <a href="#" className="footer-text px-2 link-underline link-offset-3 link-underline-opacity-0 link-underline-opacity-100-hover">Home</a>
              </li>
          </ul>
          <p className="text-center footer-text">© 2024 GoodbyeWaste, Inc</p>
      </footer>
    );
}