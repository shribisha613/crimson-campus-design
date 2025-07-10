
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DraftPlans from "./pages/DraftPlans";
import Students from "./pages/Students";
import ManageInvigilators from "./pages/ManageInvigilators";
import InvigilatorAssignment from "./components/InvigilatorAssignment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-exam" element={<Index />} />
            <Route path="/draft-plans" element={<DraftPlans />} />
            <Route path="/assign-invigilator/:planId" element={<InvigilatorAssignment />} />
            <Route path="/students" element={<Students />} />
            <Route path="/invigilators" element={<ManageInvigilators />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
