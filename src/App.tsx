import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import About from "./components/About";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AdminDashboard from "./components/AdminDashboard";
import ContentList from "./components/ContentList";
import ContentDetails from "./components/ContentDetails";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookAppointment from "./components/BookAppointment";
import AddService from "./components/AddService";
import BookingCreated from "./components/BookingCreated";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/content" element={<ContentList />} />
            <Route path="/content/:id" element={<ContentDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/book" element={<BookAppointment />} />
            <Route path="/addserv" element={<AddService />} />
            <Route
              path="/success"
              element={
                <BookingCreated
                  appointmentDetails={{
                    serviceName: "",
                    appointmentDate: "",
                    appointmentTime: "",
                  }}
                />
              }
            />
            {/* Add more routes as needed */}
          </Routes>
        </AuthProvider>
        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
