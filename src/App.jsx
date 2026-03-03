import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import Nav from "./component/Nav";
import { AuthProvider } from "./context/auth";
import ProtectedRoute from "./component/ProtectedRoute";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./component/LoadingSpinner";

const Home = lazy(() => import("./page/Home"));
const Image = lazy(() => import("./page/Image"));
const Content = lazy(() => import("./page/Content"));
const SignUp = lazy(() => import("./page/SignUp.JSX"));
const Login = lazy(() => import("./page/Login"));
const GenerateImage = lazy(() => import("./page/GenerateImage"));
const GenerateContent = lazy(() => import("./page/GenerateContent"));
const ImageHistory = lazy(() => import("./page/ImageHistory"));
const ContentHistory = lazy(() => import("./page/ContentHistory"));
const ContentDetails = lazy(() => import("./page/ContentDetails"));

function App() {
  return (
    <BrowserRouter>
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
      <AuthProvider>
        <Nav />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
            <Route
              path="/image"
              element={
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