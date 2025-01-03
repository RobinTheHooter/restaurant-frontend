"use client";
import BookingForm from "./components/BookingForm";
import ManageBookings from "./components/ManageBookings";

const styles = {
  main: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  mainContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    flex: "1 0 auto",
  },
  pageTitle: {
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "2.5rem",
    color: "#333",
    fontWeight: "bold",
  },
  pageDescription: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#666",
    fontSize: "1.2rem",
  },
  footer: {
    textAlign: "center",
    padding: "2rem",
    borderTop: "1px solid #eaeaea",
    marginTop: "2rem",
    backgroundColor: "#f8f8f8",
    flexShrink: 0,
  },
  footerText: {
    color: "#666",
    fontSize: "1rem",
  },
};

export default function Home() {
  return (
    <main style={styles.main}>
      <div style={styles.mainContainer}>
        <h1 style={styles.pageTitle}>Welcome to Our Restaurant</h1>
        <p style={styles.pageDescription}>Book your table below</p>

        <BookingForm />
        <ManageBookings />
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © {new Date().getFullYear()} Our Restaurant. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
