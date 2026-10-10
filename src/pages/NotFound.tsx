import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6 text-[#121212]">
      <span className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 font-bold">404 PAGE NOT FOUND</span>
      <h1 className="font-editorial text-5xl font-light">PAGE OUT OF CATALOG</h1>
      <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
        The editorial collection or page you are searching for does not exist or has been moved.
      </p>
      <Link to="/">
        <Button size="lg" className="px-8 py-3.5">
          RETURN TO HOMEPAGE
        </Button>
      </Link>
    </div>
  );
};
