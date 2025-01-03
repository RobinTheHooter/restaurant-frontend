export const metadata = {
  title: "Restaurant Table Booking",
  description: "Book your table at our restaurant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">{children}</div>
      </body>
    </html>
  );
}
