// This App.js file is the main entry point of your React app UI.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";// Used for notifications (toast messages) Example: success, error popup
import Nav from "./component/Nav";
import { AuthProvider } from "./context/auth";//Provides global authentication state (like login user info)
import ProtectedRoute from "./component/ProtectedRoute";//Restricts routes ,Only logged-in users can access these pages
import { lazy, Suspense } from "react";//Used for lazy loading components
import LoadingSpinner from "./component/LoadingSpinner";//Shows loading UI while components load

const Home = lazy(() => import("./page/Home"));
const Image = lazy(() => import("./page/Image"));
const Content = lazy(() => import("./page/Content"));
const SignUp = lazy(() => import("./page/SignUp.jsx"));
const Login = lazy(() => import("./page/Login"));
const GenerateImage = lazy(() => import("./page/GenerateImage"));
const GenerateContent = lazy(() => import("./page/GenerateContent"));
const ImageHistory = lazy(() => import("./page/ImageHistory"));
const ContentHistory = lazy(() => import("./page/ContentHistory"));
const ContentDetails = lazy(() => import("./page/ContentDetails"));

function App() {
  return (
    //Enables routing in your app ,Without this → navigation won’t work
    <BrowserRouter> 
      {/* Controls how notifications behave */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
      {/* AuthProvider is used to store and share login data (user info) across your entire app. */}
      <AuthProvider>
        <Nav />
        {/* While lazy component loads → show spinner */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
            <Route
              path="/image"
              element={
                /* Protected Routes Login Required */
                <ProtectedRoute>
                  <Image />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/image/generate"
              element={
                <ProtectedRoute>
                  <GenerateImage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/image/history"
              element={
                <ProtectedRoute>
                  <ImageHistory />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/content"
              element={
                <ProtectedRoute>
                  <Content />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/content/:action"
              element={
                <ProtectedRoute>
                  <GenerateContent />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/content/history"
              element={
                <ProtectedRoute>
                  <ContentHistory />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="content-details/:id"
              element={
                <ProtectedRoute>
                  <ContentDetails />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

// 1. BrowserRouter
// It enables navigation in your React app using the URL.

// 2. Routes
// It is a container that holds all your routes.
// (Think of it like a box that stores different paths/pages)

// 3. Route
// It defines which component should show for a specific URL path.


//  Definition

// Lazy loading means loading a component only when it is needed, not at the start.

//  Why we use it 

// Without lazy loading:

// All components load at once 
// App becomes slow 

// With lazy loading:

// Load only required page 
// Faster app performance 
// How lazy works
// const Home = lazy(() => import("./page/Home"));

// This means:

// Don’t load Home immediately
// Load it only when user visits that page
// What is Suspense?

// It handles loading state while component is loading

// <Suspense fallback={<LoadingSpinner />}>

//  Meaning:
// While page is loading → show spinner
// When loaded → show actual component


// Toast Notification Setup
// <ToastContainer
//   position="top-right"
//   autoClose={5000}
//   theme="light"
//   transition={Flip}
// />

//  Controls how notifications behave

// position → where toast appears
// autoClose → closes after 5 sec
// transition → animation



// What is AuthProvider?

// AuthProvider is used to store and share login data (user info) across your entire app.

// Why do we need it? 

// Imagine this:

// User logs in on Login page
// You need user data in:
// Navbar (show username)
// ProtectedRoute (check login)
// Dashboard

//  Without AuthProvider:

// You would have to pass data manually everywhere  (messy)

//  With AuthProvider:

// Data is available everywhere automatically 
// Simple Real-Life Example

// Think of AuthProvider like WiFi 

// Router = AuthProvider
// Devices = Components

// Once connected → every device gets internet
// Same way → every component gets user data

// What it stores

// Inside AuthProvider:

// {
//   user: { name: "Ayush", email: "abc@gmail.com" },
//   isLoggedIn: true,
//   login: function,
//   logout: function
// }
// In Your Code
// <AuthProvider>
//   <Nav />
//   <Routes />
// </AuthProvider>

// This means:

// Nav can access user 
// Routes can access user 
// ProtectedRoute can check login 



// Protected Routes (Login Required 🔒)

// Example:

// <Route
//   path="/image"
//   element={
//     <ProtectedRoute>
//       <Image />
//     </ProtectedRoute>
//   }
// />

// Flow:

// User visits /image
// ProtectedRoute checks login
// If logged in → show Image
// Else → redirect to login
