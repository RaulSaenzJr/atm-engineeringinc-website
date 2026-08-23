import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>&copy; {new Date().getFullYear()} ATM Engineering. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
