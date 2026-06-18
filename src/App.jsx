import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import { CurrencyProvider } from '@/lib/CurrencyContext';
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
import Requests from './pages/Requests';
import ExhibitorServices from './pages/ExhibitorServices';
import Production from './pages/Production';
import Exhibitors from './pages/Exhibitors';
import Sponsors from './pages/Sponsors';
import Analytics from './pages/Analytics';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const protect = (element) => (
    <ProtectedRoute>
      {element}
    </ProtectedRoute>
  );

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <QueryClientProvider client={queryClientInstance}>
          <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/login"           element={<Login />} />
            <Route path="/register"        element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password"  element={<ResetPassword />} />
            <Route path="/dashboard"       element={protect(<Dashboard />)} />
            <Route path="/my-events"       element={protect(<MyEvents />)} />
            <Route path="/booths"          element={protect(<Booths />)} />
            <Route path="/requests"        element={protect(<Requests />)} />
            <Route path="/exhibitor-services" element={protect(<ExhibitorServices />)} />
            <Route path="/production"      element={protect(<Production />)} />
            <Route path="/bookings"        element={protect(<Bookings />)} />
            <Route path="/settings"        element={protect(<Settings />)} />
            <Route path="/create-event"    element={protect(<CreateEvent />)} />
            <Route path="/exhibitors"      element={protect(<Exhibitors />)} />
            <Route path="/sponsors"        element={protect(<Sponsors />)} />
            <Route path="/analytics"       element={protect(<Analytics />)} />
            <Route path="*"               element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </CurrencyProvider>
    </ThemeProvider>
  )
}

export default App
