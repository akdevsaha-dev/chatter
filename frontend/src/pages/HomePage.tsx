import { Link } from 'react-router-dom';

export const HomePage = () => {

  return (
    <div className="space-y-20 py-10">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-100">
          Connect with Anyone, <span className="text-blue-400">Anywhere</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Experience real-time conversations with a modern, secure, and intuitive chat platform designed for everyone.
        </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="inline-block bg-blue-600 text-gray-100 px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-block bg-gray-700 text-gray-100 px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Login
            </Link>
          </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div className="bg-gray-800 p-6 rounded-xl space-y-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-100">Real-time Chat</h3>
          <p className="text-gray-400">
            Instant message delivery with real-time typing indicators and online status.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl space-y-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-100">Secure & Private</h3>
          <p className="text-gray-400">
            End-to-end encryption ensures your conversations stay private and secure.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl space-y-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-100">Free to Use</h3>
          <p className="text-gray-400">
            Start chatting right away with our free tier, no credit card required.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gray-800 rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400">1M+</div>
              <div className="text-gray-400 mt-2">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">50M+</div>
              <div className="text-gray-400 mt-2">Messages Sent</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">99.9%</div>
              <div className="text-gray-400 mt-2">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-100">
          Ready to start chatting?
        </h2>
        <p className="text-xl text-gray-300">
          Join millions of users who trust Chatter for their communication needs.
        </p>
          <Link
            to="/signup"
            className="inline-block bg-blue-600 text-gray-100 px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create Free Account
          </Link>
      </section>
    </div>
  );
};