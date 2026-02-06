
import { LoginContainer } from '../containers/auth';

const LoginPage = () => {
  return (
    <div 
      className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat overflow-auto"
      style={{
        backgroundImage: "url('/images/login-background.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            <div className="lg:w-1/2 relative p-12 flex items-center justify-center"
                 style={{
                   backgroundImage: "url('/images/login-background.jpg')",
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}>
              {/* Overlay oscuro */}
              <div className="absolute inset-0 bg-black/60"></div>
              
              <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">HF</span>
                </div>
              </div>

              <div className="relative z-10 text-white space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  WELCOME TO<br />
                  HomeFinder Pro<br />
                  Platform
                </h1>
                <p className="text-lg lg:text-xl text-gray-200">
                  Find your dream home, Start your journey.
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center bg-white">
              <div className="w-full max-w-md">
                <LoginContainer />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
