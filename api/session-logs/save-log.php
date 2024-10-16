<?php
    // Set the directory where session logs will be stored
    $logDirectory = __DIR__ . '/session-logs';

    // Create the session-logs directory if it doesn't exist
    if (!is_dir($logDirectory)) {
        mkdir($logDirectory, 0755, true);
    }

    // Get the raw POST data and decode the JSON
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data || !isset($data['sessionId']) || !isset($data['logEvents'])) {
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Invalid data received']);
        exit;
    }

    $sessionId = htmlspecialchars($data['sessionId']);
    $logEvents = $data['logEvents'];

    // File path for the current session log
    $logFile = $logDirectory . '/' . $sessionId . '.log';

    // Format the log entries
    $logContent = "";
    foreach ($logEvents as $event) {
        $timestamp = htmlspecialchars($event['timestamp']);
        $type = htmlspecialchars($event['type']);
        $details = json_encode($event['details']); // JSON encode the details for readability

        $logContent .= "[$timestamp] $type - Details: $details" . PHP_EOL;
    }

    // If the log file exists, prepend new log entries; otherwise, create a new file
    if (file_exists($logFile)) {
        $existingContent = file_get_contents($logFile);
        $logContent .= PHP_EOL . $existingContent;
    }

    // Write the log content to the file
    if (file_put_contents($logFile, $logContent) !== false) {
        echo json_encode(['status' => 'success', 'message' => 'Log successfully saved']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['status' => 'error', 'message' => 'Failed to write log to file']);
    }
?>
