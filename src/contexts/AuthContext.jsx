import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userServers, setUserServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState(null);

  // Discord OAuth URLs
  const DISCORD_CLIENT_ID = '1465779916518723796';
  const REDIRECT_URI = encodeURIComponent('https://kvshokwav.netlify.app/auth/callback');
  const DISCORD_OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20guilds`;

  // Real Discord OAuth login
  const login = () => {
    window.location.href = DISCORD_OAUTH_URL;
  };

  // Check for existing auth on mount
  useEffect(() => {
    const token = Cookies.get('discord_token');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      setLoading(true);
      
      // Fetch user info
      const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Fetch user's guilds
      const guildsResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Filter servers where user has admin permissions
      const adminServers = guildsResponse.data.filter(guild => 
        (guild.permissions & 0x8) === 0x8 || // Administrator
        (guild.permissions & 0x20) === 0x20   // Manage Server
      );

      setUser(userResponse.data);
      setUserServers(adminServers);
      
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const handleCallback = async (code) => {
    try {
      setLoading(true);
      
      // Call our Netlify serverless function to exchange code for token
      const response = await axios.get(`/.netlify/functions/auth-callback?code=${code}`);
      
      const { user: userData, servers, token } = response.data;
      
      // Store token in cookie
      Cookies.set('discord_token', token, { expires: 7 });
      
      // Set user and servers
      setUser(userData);
      setUserServers(servers);
      
    } catch (error) {
      console.error('OAuth callback failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('discord_token');
    setUser(null);
    setUserServers([]);
    setSelectedServer(null);
  };

  const selectServer = (server) => {
    setSelectedServer(server);
    Cookies.set('selected_server', JSON.stringify(server), { expires: 7 });
  };

  const value = {
    user,
    userServers,
    selectedServer,
    loading,
    login,
    logout,
    handleCallback,
    selectServer,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
