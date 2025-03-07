<?php
require_once 'config/db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process form data
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);
    $services = isset($_POST['services']) ? $_POST['services'] : [];
    $servicesJson = json_encode($services);

    try {
        // Insert form data into database
        $stmt = $pdo->prepare("INSERT INTO form_submissions (name, email, message, services) VALUES (:name, :email, :message, :services)");
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':message' => $message,
            ':services' => $servicesJson
        ]);

        echo json_encode([
            'status' => 'success',
            'message' => 'Thank you for your message, ' . $name . '!'
        ]);
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        echo json_encode([
            'status' => 'error',
            'message' => 'There was a problem saving your message. Please try again later.'
        ]);
    }
}
?>
