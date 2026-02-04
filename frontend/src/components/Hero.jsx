import { Link } from 'react-router';

function HeroSection() {
  if(localStorage.getItem('access_token')){
    window.location.href = '/all_polls'
  }
  return (
    <section className="relative w-full min-h-screen bg-black flex">
      <div style={{ alignSelf: 'center', justifySelf: 'center' }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-900/30 text-orange-400 rounded-full text-sm font-medium mb-8">
            🏆 Share your Opinions on polls
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Introducing
            <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              {" "}
              PollStream
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Register or Login to create poll or vote on existing poll.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link to='/register' className="px-8 py-4 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              Register
            </Link>
            <Link to='login' className="px-8 py-4 border border-zinc-700 text-gray-300 hover:bg-zinc-800 font-semibold rounded-lg transition-colors duration-200">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;