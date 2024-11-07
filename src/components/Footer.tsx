const Footer = () => {
  return (
    <div className="bg-gray-100 w-full"> 
      <div className="px-4 pt-10 mx-auto max-w-full sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8">
        <div className="grid gap-8 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-semibold tracking-wide text-gray-900">Categoría</p> 
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/" className="text-gray-700 transition-colors duration-300 hover:text-gray-900">
                    Novedades
                  </a>
                </li>
                <li>
                  <a href="/" className="text-gray-700 transition-colors duration-300 hover:text-gray-900">
                    Mundo
                  </a>
                </li>
                <li>
                  <a href="/" className="text-gray-700 transition-colors duration-300 hover:text-gray-900">
                    Juegos
                  </a>
                </li>
                <li>
                  <a href="/" className="text-gray-700 transition-colors duration-300 hover:text-gray-900">
                    Referencias
                  </a>
                </li>
              </ul>
            </div>
           
          </div>
          <div className="md:max-w-md lg:col-span-2">
            <span className="text-base font-semibold tracking-wide text-gray-900">Suscríbete para recibir actualizaciones</span>
            <form className="flex flex-col mt-4 sm:flex-row">
              <input
                placeholder="Correo electrónico"
                type="email"
                className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none sm:mr-2 sm:mb-0 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-black hover:bg-black focus:shadow-outline focus:outline-none"
              >
                Suscribirse
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              Todas las novedades para que estes al dia con nuestras noticias y ofertas!!
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-300 sm:flex-row">
          <p className="text-sm text-gray-600">© 2024 CheCasa Inc. Todos los derechos reservados.</p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;