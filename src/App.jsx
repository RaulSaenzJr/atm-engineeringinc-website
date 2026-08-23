import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Products from './components/Products'
import About from './components/About'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Products />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default App
