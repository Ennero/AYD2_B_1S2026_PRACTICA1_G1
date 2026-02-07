import { Link } from 'react-router-dom';

function HomePage() {
  return (
    // Contenedor principal
    <div className="h-screen w-full bg-white overflow-hidden relative font-sans selection:bg-orange-100">
      
      <nav className="absolute top-0 left-0 w-full z-50 py-6 px-6 md:px-12 lg:px-24 flex items-center justify-between backdrop-blur-md bg-white/90 shadow-xl border-b border-gray-100 animate-slideInDown">
        <div className="flex items-center gap-2 transform transition-all duration-500 hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
          <img 
            src="/images/logo-HomeFinder.png" 
            alt="Logo" 
            className="h-8 w-auto object-contain animate-float drop-shadow-lg"
          />
          <span className="text-xl font-bold tracking-tight text-gray-900 drop-shadow-sm">
            HomeFinder <span className="text-orange-600">Pro</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-gray-900 hover:text-orange-600 transition-all duration-300 relative group px-4 py-2"
          >
            <span className="relative z-10">Iniciar Sesión</span>
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link 
            to="/register" 
            className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-1 active:scale-95 relative overflow-hidden group"
            style={{ transformStyle: 'preserve-3d', boxShadow: '0 10px 25px rgba(249, 115, 22, 0.4)' }}
          >
            <span className="relative z-10 font-bold">Registrarse</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
          </Link>
        </div>
      </nav>

      <main className="relative w-full h-full">
        
        {/* CAPA 1 (Fondo) */}

        <div className="absolute top-[26%] left-[15%] md:left-[20%] lg:left-[25%] z-0 pointer-events-none select-none animate-slideInLeft" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards', animationDuration: '1s' }}>
           <h1 className="text-[16vh] md:text-[20vh] lg:text-[22vh] font-black tracking-tighter leading-none text-gray-100 transition-all duration-700" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}>
            encuentra
          </h1>
        </div>

        {/* CAPA 2 */}
        <div className="absolute bottom-0 left-0 right-0 z-10 h-[75%] pointer-events-none animate-slideInUp">
           <img 
             src="/images/home-background.png" 
             alt="Casa Moderna Gigante" 
             className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
             style={{ objectPosition: 'center 45%', transformStyle: 'preserve-3d' }}
           />
        </div>

        {/*CAPA 3 */}
        <div className="relative z-20 h-full pl-6 md:pl-16 lg:pl-24 pointer-events-none">
          
          {/* Bloque Superior - "busca" */}
          <div className="absolute top-[15%] md:top-[12%] animate-slideInLeft" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards', animationDuration: '1s' }}>
             <h1 className="text-[16vh] md:text-[20vh] lg:text-[22vh] font-black tracking-tighter leading-[0.8] text-gray-900 drop-shadow-lg transition-all duration-500 hover:drop-shadow-2xl hover:-translate-y-2" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}>
              busca
              <span className="text-orange-600 text-[0.4em] ml-2 inline-block animate-pulse">●</span>
            </h1>
          </div>

          {/* Bloque Inferior - "vive" */}
          <div className="absolute top-[45%] md:top-[50%] left-[8%] md:left-[10%] animate-slideInLeft" style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards', animationDuration: '1s' }}>
            <h1 className="text-[16vh] md:text-[20vh] lg:text-[22vh] font-black tracking-tighter leading-[0.8] text-gray-900 drop-shadow-lg transition-all duration-500 hover:drop-shadow-2xl hover:-translate-y-2" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}>
              vive
            </h1>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage