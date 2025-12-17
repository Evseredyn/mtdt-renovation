<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $name    = htmlspecialchars(strip_tags($_POST['person'] ?? ''));
    $phone   = htmlspecialchars(strip_tags($_POST['phone'] ?? ''));
    $email   = htmlspecialchars(strip_tags($_POST['email'] ?? ''));
    $message = htmlspecialchars(strip_tags($_POST['message'] ?? ''));

    $to      = 'zhenyavn@gmail.com';
    $subject = "New Estimate Request: " . $name;
    $headers = "From: webmaster@yourdomain.com\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-type: text/plain; charset=utf-8\r\n";

    $email_body = "You have a new estimate request:\n\n";
    $email_body .= "Name: $name\nPhone: $phone\nEmail: $email\nMessage: $message\n";
    
    if (mail($to, $subject, $email_body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Email failed to send. Check server logs.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>