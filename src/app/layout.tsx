import type { Metadata } from 'next';
import StoreProvider from '@/store/StoreProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ecoyaan - Checkout',
  description:
    'Complete your eco-friendly order at Ecoyaan. Sustainable products for a better tomorrow.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>
          {/* Header matching ecoyaan.com */}
          <header className="header">
            <div className="header__inner">
              <a href="/" className="header__logo">
                <svg className="header__logo-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#0d7a5f" stroke="none"/>
                  <path d="M8 12c0-2 1.5-4 4-5 2.5 1 4 3 4 5s-1.5 4-4 5c-2.5-1-4-3-4-5z" fill="#fff" stroke="none"/>
                </svg>
                <span className="header__logo-text">Ecoyaan</span>
              </a>
              <div className="header__tagline">Sustainability made easy</div>

              <div className="header__location">
                <span className="header__location-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0d7a5f">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </span>
                <div className="header__location-text">
                  <span className="header__location-city">Hosur, 635109</span>
                  <span className="header__location-update">Update Location</span>
                </div>
              </div>

              <div className="header__search">
                <span className="header__search-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </span>
                <input
                  type="text"
                  className="header__search-input"
                  placeholder="Search for 'Coir Brushes'"
                  readOnly
                />
              </div>

              <div className="header__actions">
                <div className="header__user">
                  <svg className="header__user-icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <span>Hello<br/><strong>Log in</strong></span>
                </div>
                <span className="header__wishlist">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </span>
              </div>
            </div>
          </header>

          <div className="main-wrapper">{children}</div>

          <footer className="footer">
            <p>&copy; 2026 Ecoyaan. Sustainability made easy.</p>
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
