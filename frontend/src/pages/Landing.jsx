import Hero from "../components/Hero"
import mount from '../components/Assets/m.png';
function LandingPage() {

  return (
    <div class="w-full h-screen bg-center bg-cover" style={{ backgroundImage: `url(${mount})`}}>
      <Hero/>
   </div>
  )
}

export default LandingPage
