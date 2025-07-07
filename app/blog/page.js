'use client';

import { useState, useEffect } from 'react';
import '../styles/blog.css';

const featuredPost = {
  title: 'The Future of Digital Currency',
  excerpt: 'Exploring how cryptocurrencies are reshaping the global financial landscape and what it means for the future of money.',
  category: 'Featured',
  readTime: '10 min read',
  date: 'August 18, 2024'
};

const blogPosts = [
  {
    id: 1,
    title: 'The Evolution of Cryptocurrency Trading',
    excerpt: 'Explore how cryptocurrency trading has evolved from simple exchanges to sophisticated platforms with advanced trading tools and strategies.',
    date: 'July 1, 2025',
    category: 'Market Analysis',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'DeFi Protocols Reshaping Finance',
    excerpt: 'Discover how decentralized finance protocols are revolutionizing lending, borrowing, and yield farming in the crypto space.',
    date: 'December 9, 2024',
    category: 'DeFi',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Smart Contracts: The Foundation of Web3',
    excerpt: 'Understanding how smart contracts are powering the next generation of decentralized applications and autonomous organizations.',
    date: 'September 24, 2024',
    category: 'Technology',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'NFTs Beyond Digital Art',
    excerpt: 'Exploring the expanding use cases of NFTs in gaming, real estate, identity verification, and more.',
    date: 'May 25, 2024',
    category: 'Innovation',
    readTime: '4 min read'
  },
  {
    id: 5,
    title: 'Crypto Security Best Practices',
    excerpt: 'Essential security measures every crypto investor should know to protect their digital assets from threats.',
    date: 'March 17, 2024',
    category: 'Security',
    readTime: '8 min read'
  },
  {
    id: 6,
    title: 'The Impact of Crypto Regulation',
    excerpt: 'Analysis of how evolving cryptocurrency regulations are shaping the future of digital asset markets worldwide.',
    date: 'November 20, 2024',
    category: 'Regulation',
    readTime: '6 min read'
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [animatedPosts, setAnimatedPosts] = useState([]);

  const categories = ['All', 'Market Analysis', 'DeFi', 'Technology', 'Innovation', 'Security', 'Regulation'];

  useEffect(() => {
    setAnimatedPosts([]);
    const timer = setTimeout(() => {
      setAnimatedPosts(filteredPosts);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blog-container">

      <section className="trending-topics">
        <h2 className="section-title">Trending Topics</h2>
        <div className="categories-container">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="articles-grid">
        {animatedPosts.map((post, index) => (
          <article 
            key={post.id} 
            className="article-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="article-content">
              <div className="article-header">
                <span className="article-category">{post.category}</span>
                <span className="article-read-time">{post.readTime}</span>
              </div>
              <h2 className="article-title">{post.title}</h2>
              <p className="article-excerpt">{post.excerpt}</p>
              <div className="article-footer">
                <span className="article-date">{post.date}</span>
                <button className="read-more-button">Read Article</button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Stay Ahead of the Curve</h2>
          <p className="newsletter-description">Get weekly insights on cryptocurrency trends, market analysis, and tech innovations.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button className="newsletter-button">Subscribe Now</button>
          </div>
        </div>
      </section>
    </div>
  );
}