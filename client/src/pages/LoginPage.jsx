
import { LoginContainer } from '../containers/auth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import Tilt from 'react-parallax-tilt';
import { useCallback } from 'react';

const LoginPage = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat overflow-auto"
      style={{
        backgroundImage: "url('/images/login-background.jpg')",
      }}
    >

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#10b981",
            },
            links: {
              color: "#10b981",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 40,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
      <motion.div 
        className="relative z-10 min-h-screen w-full flex items-center justify-center px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Tilt
          tiltMaxAngleX={3}
          tiltMaxAngleY={3}
          scale={1.01}
          transitionSpeed={2000}
          className="w-full max-w-5xl"
        >
          <motion.div 
            className="w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden" 
            style={{ minHeight: '775px' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
          <div className="flex flex-col lg:flex-row" style={{ minHeight: '775px' }}>
            <motion.div 
              className="lg:w-1/2 relative p-8 flex items-start justify-start min-h-[500px]"
              style={{ minHeight: '775px' }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              
            <div 
            className="absolute inset-6 overflow-hidden transition-all duration-700 hover:shadow-2xl"
            style={{
              borderRadius: '2.5rem'
            }}
            >
            <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)'
                }}
            >
                <div 
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000 hover:scale-110"
                style={{
                    backgroundImage: "url('/images/login-background.jpg')"
                }}
                >
                <div className="absolute inset-0 bg-black/60"></div>
                </div>
            </div>
            </div>
              
              <div className="relative z-10 p-4 flex justify-between items-start w-full">
               
                <motion.div 
                  className="text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
                    BIENVENIDO A<br />
                    <span className="text-3xl lg:text-4xl">HomeFinder Pro</span><br />
                    <span className="text-2xl lg:text-3xl">Platform</span>
                  </h1>
                  <p className="text-sm lg:text-base text-gray-200 mt-3">
                    Encuentra la casa de tus sueños, comienza tu viaje.
                  </p>
                </motion.div>
                
                {/* Logo HomeFinder */}
                <Link to="/" className="flex-shrink-0 ml-4 cursor-pointer">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.8,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg transition-all duration-300">
                      <img 
                        src="/images/logo-HomeFinder.png" 
                        alt="HomeFinder Pro" 
                        className="h-10 w-auto"
                      />
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center bg-white min-h-[500px]" 
              style={{ minHeight: '775px' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-full max-w-md">
                <LoginContainer />
              </div>
            </motion.div>
            
          </div>
        </motion.div>
        </Tilt>
      </motion.div>
    </div>
  );
};

export default LoginPage;
