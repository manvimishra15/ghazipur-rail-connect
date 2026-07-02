import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Public pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import TrainingInformation from "@/pages/TrainingInformation";
import KnowledgeCentre from "@/pages/KnowledgeCentre";
import TraineesInformation from "@/pages/TraineesInformation";
import EMagazine from "@/pages/EMagazine";
import Facilities from "@/pages/Facilities";
import Contact from "@/pages/Contact";
import Gallery from "@/pages/Gallery";
import FacultyPage from "@/pages/Faculty";
import Results from "@/pages/Results";
import Notices from "@/pages/Notices";
import Login from "@/pages/Login";
import TraineeLogin from "@/pages/TraineeLogin";
import NotFound from "@/pages/NotFound";

// Dashboard pages
import DashboardHome from "@/pages/dashboard/DashboardHome";
import DashboardAnnouncements from "@/pages/dashboard/DashboardAnnouncements";
import DashboardCourses from "@/pages/dashboard/DashboardCourses";
import DashboardGallery from "@/pages/dashboard/DashboardGallery";
import DashboardFaculty from "@/pages/dashboard/DashboardFaculty";
import DashboardResults from "@/pages/dashboard/DashboardResults";
import DashboardEbooks from "@/pages/dashboard/DashboardEbooks";
import DashboardMagazine from "@/pages/dashboard/DashboardMagazine";
import DashboardNotices from "@/pages/dashboard/DashboardNotices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public site */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/training-information" element={<TrainingInformation />} />
              <Route path="/knowledge-centre" element={<KnowledgeCentre />} />
              <Route path="/trainees-information" element={<TraineesInformation />} />
              <Route path="/e-magazine" element={<EMagazine />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/faculty" element={<FacultyPage />} />
              <Route path="/results" element={<Results />} />
              <Route path="/notices" element={<Notices />} />
            </Route>

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/trainee-login" element={<TraineeLogin />} />

            {/* Admin dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="announcements" element={<DashboardAnnouncements />} />
              <Route path="courses" element={<DashboardCourses />} />
              <Route path="gallery" element={<DashboardGallery />} />
              <Route path="faculty" element={<DashboardFaculty />} />
              <Route path="results" element={<DashboardResults />} />
              <Route path="ebooks" element={<DashboardEbooks />} />
              <Route path="magazine" element={<DashboardMagazine />} />
              <Route path="notices" element={<DashboardNotices />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
