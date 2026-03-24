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
          <header className="header">
            <div className="header__inner">
              <a href="/" className="header__logo">
                <svg className="header__logo-icon" width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="#0d7a5f" />
                  <path d="M8 12c0-2 1.5-4 4-5 2.5 1 4 3 4 5s-1.5 4-4 5c-2.5-1-4-3-4-5z" fill="#fff" />
                </svg>
                <div className="header__logo-group">
                  <span className="header__logo-text">Ecoyaan</span>
                  <span className="header__tagline">Sustainability made easy</span>
                </div>
              </a>

              <div className="header__location">
                <span className="header__location-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d7a5f">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </span>
                <div className="header__location-text">
                  <span className="header__location-city">Hosur, 635109</span>
                  <span className="header__location-update">Change</span>
                </div>
              </div>

              <div className="header__search">
                <span className="header__search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </span>
                <input
                  type="text"
                  className="header__search-input"
                  placeholder="Search for products..."
                  readOnly
                />
              </div>

              <div className="header__actions">
                <div className="header__secure-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                <div className="header__user">
                  <svg className="header__user-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Log in</span>
                </div>
                <button className="header__wishlist" aria-label="Wishlist">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
            </div>
          </header>

          <div className="main-wrapper">{children}</div>

          <footer className="footer">
            <div className="footer__inner">
              <span className="footer__brand">Ecoyaan</span>
              <span className="footer__sep">&middot;</span>
              <span>Sustainability made easy</span>
              <span className="footer__sep">&middot;</span>
              <span>&copy; 2026</span>
            </div>
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
