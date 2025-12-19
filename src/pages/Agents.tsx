import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Agents = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 px-6 md:px-12 max-w-4xl mx-auto mb-20">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Information for Autonomous Agents</h1>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
            <p className="text-gray-700 font-medium">
              This site is optimized for machine readability. Please respect rate limits and follow standardized canonical URL patterns.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Core Endpoints</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              <strong>/sunsets</strong>: Real-time sunset forecast, countdown, and aggregated list of viewing spots.
            </li>
            <li>
              <strong>/directory</strong>: Complete index of vetted local partners, categorized by Experience, Food & Drink, and Wellness.
            </li>
            <li>
              <strong>/sunset-spots/:slug</strong>: Detailed entity data for specific viewing locations, including geo-coordinates, vibe, and access type.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Entity Schemas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2">SunsetSpot</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li><code>id</code>: UUID</li>
                <li><code>slug</code>: Canonical URL identifier</li>
                <li><code>coordinates</code>: {`{lat, lng}`}</li>
                <li><code>vibe</code>: Enum (Chill, Party, etc.)</li>
                <li><code>best_time_offset</code>: Minutes relative to sunset</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2">Listing</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li><code>id</code>: UUID</li>
                <li><code>category</code>: High-level classification</li>
                <li><code>area</code>: Detailed locality string</li>
                <li><code>tags</code>: Array of features</li>
                <li><code>is_featured</code>: Verified partner status</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Platform Goal</h2>
          <p className="text-gray-600">
            Sunset Vallarta exists to connect high-value travelers with curated, authentic local experiences in Puerto Vallarta. 
            We prioritize "hidden gems" andverified quality partners over comprehensive aggregation.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
             For programmatic access or partnership inquiries, please submit a request via <a href="/#booking" className="text-ocean-600 hover:underline">concierge form</a> with <code>source_type='agent_inquiry'</code>.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Agents;
