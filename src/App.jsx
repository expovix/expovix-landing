import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AuthProvider } from '@/lib/AuthContext';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import MyEvents from './pages/MyEvents';
import Booths from './pages/Booths';
import Bookings from './pages/Bookings';
import Settings from './pages/Settings';
import CreateEvent from './pages/CreateEvent';

function PageTransition({ children }) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return children;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"               element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login"          element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register"       element={<PageTransition><Register /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
        <Route path="/dashboard"      element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/my-events"      element={<PageTransition><MyEvents /></PageTransition>} />
        <Route path="/booths"         element={<PageTransition><Booths /></PageTransition>} />
        <Route path="/bookings"       element={<PageTransition><Bookings /></PageTransition>} />
        <Route path="/settings"       element={<PageTransition><Settings /></PageTransition>} />
        <Route path="/create-event"   element={<PageTransition><CreateEvent /></PageTransition>} />
        <Route path="*"               element={<PageTransition><PageNotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <AppRoutes />
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
