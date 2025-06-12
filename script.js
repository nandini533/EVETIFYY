<script>
        document.getElementById('eventRegistrationForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate form
            const email = document.getElementById('email').value;
            const fullName = document.getElementById('fullName').value;
            const eventName = document.getElementById('eventName').value;
            const totalSeats = document.getElementById('totalSeats').value;
            const adultCount = document.getElementById('adultCount').value;
            const childCount = document.getElementById('childCount').value;
            
            // Basic validation
            if (!email || !fullName || !eventName || !totalSeats || !adultCount) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Ensure the numbers make sense
            if (parseInt(adultCount) + parseInt(childCount || 0) != parseInt(totalSeats)) {
                alert('The number of adults and children should equal the total number of seats.');
                return;
            }
            
            // In a real application, this would submit to a server
            alert('Registration submitted successfully! Please complete payment using the QR code.');
            
            // You would typically handle form submission to your backend here
            console.log('Form data:', {
                email,
                fullName,
                eventName,
                totalSeats,
                adultCount,
                childCount
            });
        });
    </script>