import React, { useState, useEffect } from "react";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },
    title: {
      fontSize: "28px",
      color: "#333",
      textAlign: "center",
      marginBottom: "30px",
    },
    bookingsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
    bookingCard: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      border: "1px solid #eaeaea",
      transition: "transform 0.2s ease",
    },
    cardTitle: {
      fontSize: "20px",
      color: "#333",
      marginBottom: "15px",
      borderBottom: "2px solid #4caf50",
      paddingBottom: "8px",
    },
    cardField: {
      margin: "10px 0",
      fontSize: "16px",
      color: "#666",
    },
    strong: {
      color: "#333",
      fontWeight: "bold",
      marginRight: "5px",
    },
    deleteButton: {
      backgroundColor: "#ff4444",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      width: "100%",
      marginTop: "15px",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
    loadingError: {
      textAlign: "center",
      padding: "20px",
      fontSize: "18px",
      color: "#666",
    },
    noBookings: {
      textAlign: "center",
      padding: "20px",
      fontSize: "18px",
      color: "#666",
      gridColumn: "1 / -1",
    },
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/api/bookings`);
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching bookings");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await fetch(`${API_URL}/api/bookings/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setBookings(bookings.filter((booking) => booking._id !== id));
        } else {
          setError("Error deleting booking");
        }
      } catch (error) {
        setError("Error deleting booking");
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading)
    return <div style={styles.loadingError}>Loading bookings...</div>;
  if (error) return <div style={styles.loadingError}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Bookings</h2>
      <div style={styles.bookingsGrid}>
        {bookings.length === 0 ? (
          <p style={styles.noBookings}>No bookings found</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              style={styles.bookingCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={styles.cardTitle}>Booking Details</h3>
              <p style={styles.cardField}>
                <strong style={styles.strong}>Name:</strong> {booking.name}
              </p>
              <p style={styles.cardField}>
                <strong style={styles.strong}>Date:</strong>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>
              <p style={styles.cardField}>
                <strong style={styles.strong}>Time:</strong> {booking.time}
              </p>
              <p style={styles.cardField}>
                <strong style={styles.strong}>Guests:</strong> {booking.guests}
              </p>
              <p style={styles.cardField}>
                <strong style={styles.strong}>Phone:</strong> {booking.phone}
              </p>
              <p style={styles.cardField}>
                <strong style={styles.strong}>Email:</strong> {booking.email}
              </p>
              <button
                onClick={() => handleDelete(booking._id)}
                style={styles.deleteButton}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#ff0000";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#ff4444";
                }}
              >
                Cancel Booking
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
