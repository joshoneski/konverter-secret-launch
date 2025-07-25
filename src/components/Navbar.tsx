
export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/bb7889a0-522d-402d-b504-5b144fc3f9d4.png" 
            alt="Konverter.ai Logo" 
            className="h-8 md:h-10"
          />
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            About
          </button>
        </div>
        
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
