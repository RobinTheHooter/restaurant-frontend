import React, { useState } from "react";

const BookingForm = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    email: "",
    phone: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontWeight: "bold",
    },
    input: {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
      width: "100%",
      boxSizing: "border-box",
    },
    select: {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
      width: "100%",
      boxSizing: "border-box",
    },
    button: {
      padding: "12px 24px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: "not-allowed",
    },
    message: {
      marginTop: "20px",
      padding: "12px",
      borderRadius: "4px",
      textAlign: "center",
    },
    errorMessage: {
      backgroundColor: "#ffebee",
      color: "#c62828",
    },
    successMessage: {
      backgroundColor: "#e8f5e9",
      color: "#2e7d32",
    },
  };

  const handleDateChange = async (date) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/availability?date=${date}`);
      const data = await response.json();

      if (response.ok) {
        setAvailableSlots(data.availableSlots);
        setFormData((prev) => ({
          ...prev,
          date: date,
          time: "",
        }));
      } else {
        setMessage("Error checking availability");
      }
    } catch (error) {
      setMessage("Error checking availability");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "date") {
      handleDateChange(value);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Booking confirmed! Thank you for your reservation.");
      setFormData({
        date: "",
        time: "",
        guests: "",
        name: "",
        email: "",
        phone: "",
      });
      setAvailableSlots([]);
      location.reload();
    } else {
      setMessage(data.error || "Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error('Booking error:', error);
    setMessage("Error submitting booking. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="date" style={styles.label}>
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            min={today}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="time" style={styles.label}>
            Available Time:
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
            disabled={!formData.date || loading}
            style={styles.select}
          >
            <option value="">Select a time</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="guests" style={styles.label}>
            Number of Guests:
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
            required
            min="1"
            max="10"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="phone" style={styles.label}>
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
          onMouseOver={(e) => {
            if (!loading) {
              e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor;
            }
          }}
          onMouseOut={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = styles.button.backgroundColor;
            }
          }}
        >
          {loading ? "Processing..." : "Book Table"}
        </button>
      </form>

      {message && (
        <div
          style={{
            ...styles.message,
            ...(message.includes("Error")
              ? styles.errorMessage
              : styles.successMessage),
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default BookingForm;
