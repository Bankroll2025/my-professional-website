// Initialize EmailJS with your public key
(function() {
    emailjs.init("nqLDVniO3BUlQ-e1n");
})();

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    // Initialize flatpickr
    const datePicker = flatpickr("#preferred_date", {
        minDate: "today",
        disable: [
            function(date) {
                // Disable Sundays and Mondays
                return date.getDay() === 0 || date.getDay() === 1;
            }
        ],
        locale: {
            "firstDayOfWeek": 1 // Start week on Monday
        }
    });

    // Initialize time picker
    const timePicker = flatpickr("#preferred_time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        minTime: "10:00",
        maxTime: "18:00",
        defaultDate: "10:00",
        minuteIncrement: 30
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = bookingForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;

            try {
                // Get form data
                const formData = new FormData(bookingForm);
                
                // Calculate age
                const birthDate = new Date(formData.get('client_birthdate'));
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                // Check if client is 18 or older
                if (age < 18) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message';
                    errorDiv.innerHTML = `
                        <h3>Age Restriction</h3>
                        <p>You must be 18 or older to book a tattoo appointment.</p>
                        <button onclick="location.reload()" class="refresh-button">Try Again</button>
                    `;
                    bookingForm.replaceWith(errorDiv);
                    return;
                }

                const data = {
                    clientFirstName: formData.get('client_first_name'),
                    clientLastName: formData.get('client_last_name'),
                    clientEmail: formData.get('client_email'),
                    clientPhone: formData.get('client_phone'),
                    clientGender: formData.get('client_gender'),
                    clientBirthdate: formData.get('client_birthdate'),
                    clientAge: age,
                    preferredDate: formData.get('preferred_date'),
                    preferredTime: formData.get('preferred_time'),
                    tattooType: formData.get('tattooType'),
                    tattooSize: formData.get('tattooSize'),
                    tattooPlacement: formData.get('tattooPlacement'),
                    tattooDescription: formData.get('tattooDescription'),
                    colorPreference: formData.get('colorPreference') || 'Not specified',
                    additionalNotes: formData.get('additionalNotes') || 'None',
                    bookingId: generateBookingId()
                };

                const formattedDate = new Date(data.preferredDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                try {
                    // Send notification to shop owner
                    console.log('Sending shop notification...');
                    const shopResponse = await emailjs.send(
                        "service_2e752is",
                        "template_tukgt7p",
                        {
                            to_email: "senghakmad@gmail.com",
                            from_name: `${data.clientFirstName} ${data.clientLastName}`,
                            message: `
                                New Tattoo Appointment Request at Inked by Chris
                                
                                Client Details:
                                Name: ${data.clientFirstName} ${data.clientLastName}
                                Email: ${data.clientEmail}
                                Phone: ${data.clientPhone}
                                Gender: ${data.clientGender}
                                Age: ${data.clientAge}
                                
                                Appointment Details:
                                Date: ${formattedDate}
                                Time: ${data.preferredTime}
                                
                                Tattoo Details:
                                Type: ${data.tattooType}
                                Size: ${data.tattooSize}
                                Placement: ${data.tattooPlacement}
                                Description: ${data.tattooDescription || 'Not provided'}
                                Color Preference: ${data.colorPreference}
                                
                                Additional Notes: ${data.additionalNotes || 'None'}
                                
                                Booking ID: ${data.bookingId}
                                
                                Studio Location:
                                2395 7th St N
                                Saint Paul, MN 55109
                            `,
                            subject: `New Tattoo Appointment Request - ${formattedDate} at ${data.preferredTime}`
                        }
                    );
                    console.log('Shop notification sent successfully');

                    // Send confirmation to client
                    console.log('Sending client confirmation...');
                    const clientResponse = await emailjs.send(
                        "service_2e752is",
                        "template_gowinjb",
                        {
                            to_email: data.clientEmail,
                            from_name: "Inked by Chris",
                            message: `
                                Thank you for booking your tattoo appointment with Inked by Chris!
                                
                                Appointment Details:
                                Date: ${formattedDate}
                                Time: ${data.preferredTime}
                                
                                Your Details:
                                Name: ${data.clientFirstName} ${data.clientLastName}
                                
                                Tattoo Details:
                                Type: ${data.tattooType}
                                Size: ${data.tattooSize}
                                Placement: ${data.tattooPlacement}
                                
                                Your booking ID is: ${data.bookingId}
                                
                                Studio Location:
                                2395 7th St N
                                Saint Paul, MN 55109
                                
                                Important Information:
                                - Please arrive 15 minutes before your appointment time
                                - Bring a valid ID showing you are 18 or older
                                - A deposit may be required for certain tattoo sizes
                                
                                Need to reschedule or cancel?
                                Contact us at:
                                Phone: (651) 592-5122
                                Email: senghakmad@gmail.com
                                
                                Follow us on social media:
                                Instagram: @inked_bychris
                                Snapchat: @sasuke_2k
                                
                                We look forward to creating your custom tattoo!
                            `,
                            subject: `Your Tattoo Appointment Confirmation - Inked by Chris`
                        }
                    );
                    console.log('Client confirmation sent successfully');

                    // Show success message
                    const successDiv = document.createElement('div');
                    successDiv.className = 'success-message';
                    successDiv.innerHTML = `
                        <h3>Booking Successful!</h3>
                        <p>Your appointment has been scheduled for ${formattedDate} at ${data.preferredTime}.</p>
                        <p>A confirmation email has been sent to ${data.clientEmail}.</p>
                        <p>Your booking ID is: ${data.bookingId}</p>
                        <div class="booking-details">
                            <p><strong>Name:</strong> ${data.clientFirstName} ${data.clientLastName}</p>
                            <p><strong>Date:</strong> ${formattedDate}</p>
                            <p><strong>Time:</strong> ${data.preferredTime}</p>
                            <p><strong>Tattoo Type:</strong> ${data.tattooType}</p>
                            <p><strong>Size:</strong> ${data.tattooSize}</p>
                            <p><strong>Placement:</strong> ${data.tattooPlacement}</p>
                        </div>
                        <p class="studio-info">
                            <strong>Studio Location:</strong><br>
                            2395 7th St N<br>
                            Saint Paul, MN 55109
                        </p>
                        <button onclick="location.reload()" class="refresh-button">Book Another Appointment</button>
                    `;
                    bookingForm.replaceWith(successDiv);

                } catch (error) {
                    console.error('Email error details:', error);
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message';
                    errorDiv.innerHTML = `
                        <h3>Email Notification Error</h3>
                        <p>There was an error sending the confirmation email. Please save your booking information:</p>
                        <div class="booking-details">
                            <p><strong>Booking ID:</strong> ${data.bookingId}</p>
                            <p><strong>Date:</strong> ${formattedDate}</p>
                            <p><strong>Time:</strong> ${data.preferredTime}</p>
                        </div>
                        <p>Contact us to confirm your appointment:</p>
                        <p><strong>Email:</strong> senghakmad@gmail.com</p>
                        <p><strong>Phone:</strong> (651) 592-5122</p>
                        <button onclick="location.reload()" class="refresh-button">Try Again</button>`;
                    
                    bookingForm.replaceWith(errorDiv);
                    throw error;
                }
            } catch (error) {
                console.error('Full error details:', error);
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.innerHTML = `
                    <h3>Booking Error</h3>
                    <p>There was an error processing your booking. Please try again or contact us directly.</p>
                    <p><strong>Phone:</strong> (651) 592-5122</p>
                    <p><strong>Email:</strong> senghakmad@gmail.com</p>
                    <button onclick="location.reload()" class="refresh-button">Try Again</button>
                `;
                bookingForm.replaceWith(errorDiv);
            } finally {
                submitButton.textContent = 'Book Appointment';
                submitButton.disabled = false;
            }
        });
    }

    // Helper function to generate booking ID
    function generateBookingId() {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 8);
        return `IC-${timestamp}-${randomStr}`.toUpperCase();
    }
});

// Check for reschedule or cancel parameters
const urlParams = new URLSearchParams(window.location.search);
const rescheduleId = urlParams.get('reschedule');
const cancelId = urlParams.get('cancel');

if (rescheduleId) {
    // Handle reschedule logic
    console.log('Reschedule booking:', rescheduleId);
    // Add your reschedule handling code here
}

if (cancelId) {
    // Handle cancellation logic
    console.log('Cancel booking:', cancelId);
    // Add your cancellation handling code here
}
