import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import About from "./Components/AboutUs/About";
import Contact from "./Components/Contact";
import ListDeputyDirectors from "./Components/AboutUs/DeputyDirectors";
import MandateOfDept from "./Components/AboutUs/MandateOfDept";
import Sidebar from "./Components/Admin/Sidebar";

import AllUpdates from "./Components/Informations/AllUpdates";
import AllAdvertisements from "./Components/Informations/AllAdvertisements";
// import AllNews from "./Components/Informations/AllNews";
import Login from "./Components/Admin/Login";
import RecentUpdates from "./Components/Admin/Pages/RecentUpdates";
import AddUpdate from "./Components/Admin/Pages/AddUpdate";
import EditUpdate from "./Components/Admin/Pages/EditUpdate";

import AdminNews from "./Components/Admin/News/AdminNews";
import AddNews from "./Components/Admin/News/AddNews";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./Components/Admin/Auth/ProtectedRoute";
import { UserAuthContextProvider } from "./Components/Admin/Auth/UserAuthContext";
import NewsDetails from "./Components/NewsDetails";
import AllNews from "./Components/AllNews";
import Copyright from "./Components/Policies/Copyright";
import Privacy from "./Components/Policies/Privacy";
import AdminNavbar from "./Components/Admin/AdminNavbar";
import EditNews from "./Components/Admin/News/EditNews";
import Dashboard from "./Components/Admin/Dashboard";
import UpdateDetails from "./Components/UpdateDetails";
import DeputyDirectors from "./Components/Admin/DeputyDirectors";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/mandate-of-the-department"
          element={
            <>
              <Navbar />
              <MandateOfDept />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route
          path="/list-of-deputy-directors"
          element={
            <>
              <Navbar />
              <ListDeputyDirectors />
              <Footer />
            </>
          }
        />

        <Route
          path="/updates"
          element={
            <>
              <Navbar />
              <AllUpdates />
              <Footer />
            </>
          }
        />

        <Route
          path="/update/:id"
          element={
            <>
              <Navbar />
              <UpdateDetails />
              <Footer />
            </>
          }
        />

        <Route
          path="/newsdetail/:id"
          element={
            <>
              <Navbar />
              <NewsDetails />
              <Footer />
            </>
          }
        />

        <Route
          path="/all-news"
          element={
            <>
              <Navbar />
              <AllNews />
              <Footer />
            </>
          }
        />

        <Route
          path="/advertisements"
          element={
            <>
              <Navbar />
              <AllAdvertisements />
              <Footer />
            </>
          }
        />

        <Route
          path="/policy-copyright"
          element={
            <>
              <Navbar />
              <Copyright />
              <Footer />
            </>
          }
        />

        <Route
          path="/policy-privacy"
          element={
            <>
              <Navbar />
              <Privacy />
              <Footer />
            </>
          }
        />
      </Routes>

      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <Sidebar />
                {/* <AdminNavbar /> */}
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-updates"
            element={
              <ProtectedRoute>
                <Sidebar />
                {/* <AdminNavbar /> */}
                <RecentUpdates />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-add-update"
            element={
              <>
                <ProtectedRoute>
                  <Sidebar />
                  {/* <AdminNavbar /> */}
                  <AddUpdate />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/update-admin-update/:id"
            element={
              <>
                <ProtectedRoute>
                  <Sidebar />
                  {/* <AdminNavbar /> */}
                  <EditUpdate />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/admin-add-news"
            element={
              <>
                <ProtectedRoute>
                  <Sidebar />
                  {/* <AdminNavbar /> */}
                  <AddNews />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/admin-edit-news/:id"
            element={
              <>
                <ProtectedRoute>
                  <Sidebar />
                  {/* <AdminNavbar /> */}
                  <EditNews />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/admin-all-news"
            element={
              <>
                <ProtectedRoute>
                  <Sidebar />
                  {/* <AdminNavbar /> */}
                  <AdminNews />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/admin-deputy-directors"
            element={
              <>
                <ProtectedRoute>
                  <Sidebar />
                  {/* <AdminNavbar /> */}
                  <DeputyDirectors />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
