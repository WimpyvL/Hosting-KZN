<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Retrieve the services from the form
    $services = isset($_POST['services']) ? $_POST['services'] : [];
    
    // Build a formatted string of selected services
    $servicesBody = "";
    if (!empty($services)) {
        foreach ($services as $service) {
            $servicesBody .= "- " . $service . "\n";
        }
    } else {
        $servicesBody = "No services selected.";
    }
    
    $to = "info@hostingkzn.com"; 
    $subject = "New Form Submission from $name";
    $body = "Name: $name\nEmail: $email\nMessage: $message\nSelected Services:\n$servicesBody";
    $headers = "From: $email\r\nReply-To: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for your message, $name!";
    } else {
        error_log("Email failed to send to $to. Subject: $subject. Body: $body");
        echo "There was a problem sending your message. Please try again later.";
    }
}
?>
