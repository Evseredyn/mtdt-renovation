<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Збір та очищення даних (залишається)
    $name    = htmlspecialchars(strip_tags($_POST['person'] ?? ''));
    $phone   = htmlspecialchars(strip_tags($_POST['phone'] ?? ''));
    $email   = htmlspecialchars(strip_tags($_POST['email'] ?? ''));
    $message = htmlspecialchars(strip_tags($_POST['message'] ?? ''));

    // 2. Налаштування для mail()
    $to      = 'zhenyavn@gmail.com'; // Ваш email-отримувач
    $subject = "New Estimate Request: " . $name;
    $headers = "From: webmaster@yourdomain.com\r\n"; // Ваш домен
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-type: text/plain; charset=utf-8\r\n";

    $email_body = "You have a new estimate request:\n\n";
    $email_body .= "Name: $name\nPhone: $phone\nEmail: $email\nMessage: $message\n";
    
    // 3. Відправка
    if (mail($to, $subject, $email_body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
    } else {
        // На локальному MAMP це завжди повертало 'error', але на хостингу має працювати
        echo json_encode(['status' => 'error', 'message' => 'Email failed to send. Check server logs.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>