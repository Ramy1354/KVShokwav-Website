import './Home.css';

function Home() {
  const features = [
    {
      icon: '🛡️',
      title: 'Moderation',
      description: 'Advanced moderation tools including channel lock, slowmode, server lockdown, kick, and ban commands.'
    },
    {
      icon: '🎮',
      title: 'Entertainment',
      description: 'Fun commands like 8ball, dice roll, coin flip, jokes, and memes to keep your server engaged.'
    },
    {
      icon: '💰',
      title: 'Economy System',
      description: 'Complete economy system with balance tracking, daily rewards, work commands, and banking features.'
    },
    {
      icon: '⚙️',
      title: 'Server Setup',
      description: 'Easy-to-use dashboard for configuring your server settings, welcome messages, and auto-roles.'
    },
    {
      icon: '📊',
      title: 'Utility Commands',
      description: 'Helpful utility commands including AFK status, server info, user info, and role information.'
    },
    {
      icon: '✨',
      title: 'Embed Creator',
      description: 'Beautiful embed creator tool to design custom embeds for announcements and messages.'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">Shok.wav</span>
          </h1>
          <p className="hero-subtitle">
            The ultimate Discord bot for moderation, entertainment, and server management
          </p>
          <div className="hero-buttons">
            <a
              href="https://discord.com/oauth2/authorize?client_id=1465779916518723796&permissions=8&integration_type=0&scope=bot"
              className="btn-primary glow-effect"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to Discord
            </a>
            <a href="/dashboard" className="btn-secondary">
              Dashboard
            </a>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2 className="section-title gradient-text">Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-value gradient-text">10+</div>
            <div className="stat-label">Commands</div>
          </div>
          <div className="stat-item">
            <div className="stat-value gradient-text">24/7</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-item">
            <div className="stat-value gradient-text">Fast</div>
            <div className="stat-label">Response Time</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
