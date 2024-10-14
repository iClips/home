<?php
// Set the content type to JSON
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON input
    $input = file_get_contents('php://input');
    
    // Decode the JSON data
    $events = json_decode($input, true);

    // Check if the decoding was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['error' => 'Invalid JSON']);
        http_response_code(400); // Bad request
        exit;
    }

    // Prepare the log entry
    $logEntries = [];
    foreach ($events as $event) {
        $logEntries[] = sprintf(
            "%s, %s, %s, %s",
            $event['id'],
            $event['type'],
            $event['timestamp'],
            json_encode($event['details'])
        );
    }
    $logEntry = implode("\n", $logEntries) . "\n";

    // Append the log entry to the file
    file_put_contents('user_events.txt', $logEntry, FILE_APPEND | LOCK_EX);

    // Respond with success
    echo json_encode(['message' => 'Events logged successfully']);
} else {
    // Method not allowed
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Method not allowed']);
}
?>
