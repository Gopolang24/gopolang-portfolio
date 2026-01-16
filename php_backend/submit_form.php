<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "db_connect.php"; // Secure database connection

// Get and sanitize user inputs
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validate inputs
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400); // Bad request
    echo json_encode(["message" => "❌ All fields are required!"]);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // Bad request
    echo json_encode(["message" => "❌ Invalid email format!"]);
    exit();
}

// Prepare SQL statement to prevent SQL injection
$sql = "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "❌ Database error: " . $conn->error]);
    exit();
}

$stmt->bind_param("ssss", $name, $email, $subject, $message);

if ($stmt->execute()) {
    http_response_code(200); // OK
    echo json_encode(["message" => "✅ Message submitted successfully!"]);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "❌ Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
