import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import SettingPage from "./pages/SettingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import Detail from "./components/Detail";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signout } from "../src/redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import EmployerSignInPage from "./pages/EmployerSignInPage";
import EmployerRegisterPage from "./pages/EmployerRegisterPage";
import DashBoardPage from "./pages/DashBoardPage";
import PostJobPage from "./pages/PostJobPage";
import EmployerSettingPage from "./pages/EmployerSettingPage";
import PostPage from "./pages/PostPage";
import EditJobPage from "./pages/EditJobPage";
import JobPage from "./pages/JobPage";
import JobDetailPage from "./pages/JobDetailPage";
import JobCategoryPage from "./pages/JobCategoryPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkSession() {
      const res = await fetch("/api/auth/checksession");
      const data = await res.json();
      if (data.session == "expired") {
        dispatch(signout());
      }
    }
    checkSession();
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/employer-signin" element={<EmployerSignInPage />} />
        <Route path="/employer-signup" element={<EmployerRegisterPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="/employer-setting" element={<EmployerSettingPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/job/:jobId" element={<JobDetailPage />} />
        <Route path="/search/" element={<JobPage />} />
        <Route path="/editjob/:postId" element={<EditJobPage />} />
        <Route path="/job-category/:category" element={<JobCategoryPage />} />

        {/* protect routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/setting" element={<SettingPage />}>
            <Route path="profile" element={<Profile />} index />
            <Route path="detail_info" element={<Detail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
