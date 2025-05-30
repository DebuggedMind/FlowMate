import { FC } from 'react';
import { Github, Mail, Twitter } from 'lucide-react';

const Footer: FC = () => {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FlowMate</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Streamlining hydraulic and hydrologic analysis for civil engineering students,
              researchers, and professionals.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Features</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} FlowMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;