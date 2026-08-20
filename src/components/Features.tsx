

import React from 'react';

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const featuresData: FeatureItem[] = [
  {
    id: 1,
    title: 'Real-time Collaboration',
    description: 'Work with your team members simultaneously with instant updates across all devices.',
    icon: '👥',
  },
  {
    id: 2,
    title: 'Automated Workflows',
    description: 'Reduce manual effort by setting up triggers and automation for recurring processes.',
    icon: '⚡',
  },
  {
    id: 3,
    title: 'Detailed Analytics',
    description: 'Gain insights into team performance and project timelines with automated reporting.',
    icon: '📊',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need to manage projects
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A simplified approach to handling complex projects with modern, customizable features.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature) => (
            <div 
              key={feature.id} 
              className="p-6 border border-gray-100 rounded-xl bg-gray-50 hover:shadow-sm transition duration-200"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};