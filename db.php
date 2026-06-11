<?php
// Enable strict error reporting
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = mysqli_connect("127.0.0.1", "root", "gayatri", "portfolio");
} catch (mysqli_sql_exception $e) {
    // Return connection error in JSON format for the front-end AJAX handler
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed. Please try again later.'
    ]);
    exit();
}
?>
