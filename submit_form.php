<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check content type and parse data accordingly
    $contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
    
    if (strpos($contentType, 'application/json') !== false) {
        $data = json_decode(file_get_contents('php://input'), true);
    } else {
        $data = $_POST;
    }

    if (empty($data)) {
        http_response_code(400);
        $response = [
            'success' => false,
            'error' => 'Invalid request data'
        ];
        die(json_encode($response));
    }

    // Process form data
    $name = htmlspecialchars($data['name']);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($data['message']);
    $services = isset($data['services']) ? $data['services'] : [];
    $servicesJson = json_encode($services);
    // Make sure we get the contact number regardless of how it's named in the form
    $contactNumber = isset($data['contact_number']) ? htmlspecialchars($data['contact_number']) : 
                    (isset($data['contactNumber']) ? htmlspecialchars($data['contactNumber']) : 
                    (isset($data['contact-number']) ? htmlspecialchars($data['contact-number']) : ''));

    // Email sending functionality
    $to = 'wimpie@hostingkzn.com';
    $subject = 'New Form Submission from ' . $name;
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Ensure contact number is properly formatted in the email
    $messageBody = "Name: $name\r\n\r\nEmail: $email\r\n\r\nContact Number: " . $contactNumber . "\r\n\r\nServices: $servicesJson\r\n\r\nMessage: $message";
    
    // Log the data for debugging
    error_log("Form submission data: " . print_r($data, true));
    error_log("Contact number: " . $contactNumber);

    // Send email without response handling
    mail($to, $subject, $messageBody, $headers);
}
?>