const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2034&q=80')",
          backgroundBlendMode: "overlay"
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl">
          Engineering Intelligent <span className="text-blue-400">AV & IT Ecosystems</span> for Modern Enterprises
        </h1>
        
        <p className="text-xl text-gray-200 mb-8 max-w-3xl">
          We design, integrate, and support advanced Audio-Visual and Enterprise IT infrastructures 
          that enable seamless collaboration, secure connectivity, and intelligent control across 
          corporate, institutional, and premium environments.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Explore Solutions
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Contact Us
          </button>
        </div>
        
        <div className="mt-12 flex items-center gap-2 text-gray-300">
          <span className="text-blue-400">🔹</span>
          <span>Design. Integrate. Optimize. Support.</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;