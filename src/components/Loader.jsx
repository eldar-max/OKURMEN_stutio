import './Loader.css';

function Loader({ size = 'md', fullScreen = false }) {
  const sizes = {
    sm: '0.8px',
    md: '1.5px',
    lg: '2.5px',
  };

  const loaderStyle = {
    '--size': sizes[size] || sizes.md,
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <span className="loader" style={loaderStyle}></span>
          <p className="mt-8 text-gray-600 font-semibold text-lg">Загрузка...</p>
        </div>
      </div>
    );
  }

  return <span className="loader" style={loaderStyle}></span>;
}

export default Loader;
