<?php
// Set headers for JSON response
header('Content-Type: application/json; charset=utf-8');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit();
}

// Include database connection
include 'db.php';

// Get and trim inputs
$name    = isset($_POST['name']) ? trim($_POST['name']) : '';
$email   = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate inputs
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'All fields are required.'
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Please enter a valid email address.'
    ]);
    exit();
}

try {
    // Insert into contacts table using prepared statements
    $stmt = mysqli_prepare($conn, "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
    mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $subject, $message);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    echo json_encode([
        'status' => 'success',
        'message' => 'Message Saved Successfully.'
    ]);
} catch (mysqli_sql_exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Could not save the message. Please try again later.'
    ]);
} finally {
    mysqli_close($conn);
}
?>
