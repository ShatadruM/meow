// TestPage.jsx
import React from 'react';
import MembersList from '../components/MembersList';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Component Verification
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Hover over the cards below to test the GSAP sliding animations, lab color rendering, and layer positioning.
          </p>
        </div>
        
        {/* Component Integration */}
        <div className="rounded-xl border border-gray-300 overflow-hidden shadow-sm">
          <MembersList />
        </div>

      </div>
    </div>
  );
};

export default TestPage;