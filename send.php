<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Отримуємо дані
    $name    = isset($_POST['person']) ? strip_tags(trim($_POST['person'])) : 'Not specified';
    $phone   = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : 'Not specified';
    $email   = isset($_POST['email']) ? strip_tags(trim($_POST['email'])) : 'Not specified';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : 'No message';

    $to      = 'zhenyavn@gmail.com';
    $subject = "New Request from Website: " . $name;
    
    // ВАЖЛИВО: Заміни 'yourdomain.com' на свій домен
    $headers = "From: info@yourdomain.com\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=utf-8\r\n";

    $email_body = "You have a new request:\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Phone: $phone\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Message: $message\n";
    
    // Спробуємо відправити
    if (@mail($to, $subject, $email_body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Sent!']);
    } else {
        // Якщо mail() не працює, ми хоча б побачимо, що дані дійшли до PHP
        echo json_encode(['status' => 'error', 'message' => 'Server rejected mail(). Try contact hosting support.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}