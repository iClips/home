<?php
// Set the content type to JSON
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sessionId = $data['sessionId']; // Get session ID
    $logEntry = $data['logEntry']; // Get log entry

    // Create a log file for each session or use one log file to keep all
    $logFilePath = 'user_events.txt'; 

    // Append new log entry
    $existingLogs = file_exists($logFilePath) ? json_decode(file_get_contents($logFilePath), true) : [];

    // Check if the session already exists
    if (!isset($existingLogs[$sessionId])) {
        $existingLogs[$sessionId] = []; // Initialize log for this session
    }

    // Add the new log entry to the session's log
    $existingLogs[$sessionId][] = $logEntry;

    // Write back to the log file, overwriting the previous content
    file_put_contents($logFilePath, json_encode($existingLogs, JSON_PRETTY_PRINT));
} else {
    // Method not allowed
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Method not allowed']);
}
?>
