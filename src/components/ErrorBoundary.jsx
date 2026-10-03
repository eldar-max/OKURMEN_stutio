import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
      errorCount: this.state.errorCount + 1
    });

    // You can also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-white text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <FaExclamationTriangle className="text-6xl mx-auto mb-4" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-2">Упс! Бир нерсе туура эмес болду</h1>
                <p className="text-red-100">Oops! Something went wrong</p>
              </div>

              {/* Body */}
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Эмне болду?</h2>
                  <p className="text-gray-600 mb-4">
                    Тиркеме күтүлбөгөн ката кездештирди. Биздин команда бул маселени чечүү үчүн иштеп жатат.
                  </p>
                  <p className="text-gray-600">
                    The application encountered an unexpected error. Our team is working to resolve this issue.
                  </p>
                </div>

                {/* Error Details (only in development) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 bg-gray-50 border-l-4 border-red-500 p-4 rounded"
                  >
                    <h3 className="text-sm font-bold text-gray-700 mb-2">Error Details (Dev Mode):</h3>
                    <p className="text-sm text-red-600 font-mono mb-2">
                      {this.state.error.toString()}
                    </p>
                    {this.state.errorInfo && (
                      <details className="text-xs text-gray-600 font-mono">
                        <summary className="cursor-pointer hover:text-gray-800 mb-2">
                          Stack Trace
                        </summary>
                        <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded overflow-auto max-h-48">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </motion.div>
                )}

                {/* Error Count Warning */}
                {this.state.errorCount > 1 && (
                  <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Бул ката {this.state.errorCount} жолу кайталанды. 
                      Эгер маселе улантса, беттти жаңылаңыз же башкы бетке кайрылыңыз.
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={this.handleReset}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <FaRedo />
                    <span>Кайра аракет кылуу / Try Again</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={this.handleGoHome}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold shadow-md hover:shadow-lg transition-shadow"
                  >
                    <FaHome />
                    <span>Башкы бетке / Go Home</span>
                  </motion.button>
                </div>

                {/* Help Text */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Эгер маселе улантса, биз менен байланышыңыз:{' '}
                    <a href="mailto:support@okurmen.kg" className="text-orange-600 hover:text-orange-700 font-semibold">
                      support@okurmen.kg
                    </a>
                  </p>
                  <p className="text-xs text-gray-400 text-center mt-2">
                    If the problem persists, please contact us at support@okurmen.kg
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-600">
                OKURMEN IT Academy © {new Date().getFullYear()}
              </p>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
