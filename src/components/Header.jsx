import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">

        <div className="logo-wrap">
          <div className="logo-placeholder">
            <span>LOGO</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <ul className="nav-list">
            <li><a href="#home" className="nav-link active">Home</a></li>
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#products" className="nav-link">Products</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
          </ul>
        </nav>

      </div>
    </header>
  )
}

export default Header
