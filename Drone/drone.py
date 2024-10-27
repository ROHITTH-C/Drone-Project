import cv2
import requests

# Open webcam
cap = cv2.VideoCapture(0)

# Manually input coordinates (latitude and longitude)
latitude =  16.568489091817884 # Example latitude (New York City)
longitude =   81.52198767046922 # Example longitude (New York City)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Print values for debugging (manually provided coordinates)
    print(f"Latitude: {latitude}, Longitude: {longitude}")

    # Send extracted coordinates to the server
    location_data = {'latitude': str(latitude), 'longitude': str(longitude)}
    response = requests.post("http://localhost/drone.php", data=location_data)

    # Print the response from the PHP script
    print("Response:", response.text)

    # Display the webcam feed
    cv2.imshow('Webcam', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
