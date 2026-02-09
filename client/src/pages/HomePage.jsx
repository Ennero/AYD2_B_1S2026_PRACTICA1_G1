import { NavbarClient } from '../components/layout'

function HomePage() {
  return (
    // Contenedor principal
    <div className="h-screen w-full bg-white overflow-hidden relative font-sans selection:bg-orange-100">
      
      <NavbarClient isAuthenticated={false} />

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