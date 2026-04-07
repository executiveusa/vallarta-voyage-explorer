/**
 * Admin Panel — Frontend-only placeholder
 */

import Navbar from "@/components/Navbar";

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-gray-600">Admin features require a backend connection. Please contact the development team to enable backend services.</p>
      </main>
    </div>
  );
};

export default AdminPanel;
