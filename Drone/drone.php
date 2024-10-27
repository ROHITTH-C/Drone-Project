<?php
// drone.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Handle the POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $latitude = isset($_POST['latitude']) ? $_POST['latitude'] : null;
    $longitude = isset($_POST['longitude']) ? $_POST['longitude'] : null;

    // Store the received coordinates in a file
    if ($latitude !== null && $longitude !== null) {
        file_put_contents('coordinates.txt', json_encode(['latitude' => $latitude, 'longitude' => $longitude]));
        echo json_encode(['status' => 'success', 'latitude' => $latitude, 'longitude' => $longitude]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Latitude and longitude are required.']);
    }
} else {
    // Display the last saved coordinates if they exist
    if (file_exists('coordinates.txt')) {
        $data = json_decode(file_get_contents('coordinates.txt'), true);
        echo json_encode(['status' => 'success', 'data' => $data]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No coordinates available.']);
    }
}
?>
