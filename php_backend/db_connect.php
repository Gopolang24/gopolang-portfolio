<?php
$config = include "config.php";  // Load configuration

$host = $config["DB_HOST"];
$username = $config["DB_USER"];
$password = $config["DB_PASSWORD"];
$dbname = $config["DB_NAME"];

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["message" => "❌ Connection failed: " . $conn->connect_error]));
}
?>
