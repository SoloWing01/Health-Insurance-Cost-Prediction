import './globals.css';

export const metadata = {
  title: 'Medical Insurance Predictor',
  description: 'Estimate insurance charges using a trained machine learning model.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
