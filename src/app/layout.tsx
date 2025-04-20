// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';
import "react-datepicker/dist/react-datepicker.css";

// ----------------------------------------------------------------------

// theme
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
// components
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// auth
import { AuthProvider, AuthConsumer } from 'src/auth/context/jwt';
import { Providers } from 'src/components/providers';
import { ReduxProvider } from 'src/redux/provider';
import { LocalizationProvider } from 'src/locales';
import { GoogleOAuthProvider } from '@react-oauth/google';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'YOUR PASS',
  description: 'YOUR PASS - Your secure password and identity management solution',
  keywords: 'password,security,identity,management,authentication',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&family=Public+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <style>{`
          @font-face {
            font-family: 'Barlow';
            src: url('/fonts/Barlow-Regular.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      <body>
        <ReduxProvider>
          <Providers>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
              <AuthProvider>
                <LocalizationProvider>
                  <SettingsProvider
                    defaultSettings={{
                      themeMode: 'light', // 'light' | 'dark'
                      themeDirection: 'ltr', //  'rtl' | 'ltr'
                      themeContrast: 'default', // 'default' | 'bold'
                      themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                      themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                      themeStretch: false,
                    }}
                  >
                    <ThemeProvider>
                      <MotionLazy>
                        <SettingsDrawer />
                        <ProgressBar />
                        <AuthConsumer>{children}</AuthConsumer>
                      </MotionLazy>
                    </ThemeProvider>
                  </SettingsProvider>
                </LocalizationProvider>
              </AuthProvider>
            </GoogleOAuthProvider>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
