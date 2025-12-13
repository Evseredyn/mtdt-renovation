<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Куди відправляємо
    $to = "zhenyavn@gmail.com"; 
    $subject = "New Estimate Request from Website";

    // 2. Очищення даних від спаму та тегів
    $name    = htmlspecialchars(strip_tags($_POST['person'] ?? ''));
    $phone   = htmlspecialchars(strip_tags($_POST['phone'] ?? ''));
    $email   = htmlspecialchars(strip_tags($_POST['email'] ?? ''));
    $message = htmlspecialchars(strip_tags($_POST['message'] ?? ''));
    $policy  = isset($_POST['policy']) ? 'Accepted' : 'Not accepted';

    // 3. Формування тексту листа
    $email_content = "You have a new request:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Message: $message\n";
    $email_content .= "Privacy Policy: $policy\n";

    // 4. Заголовки листа
    $headers = "From: zhenyavn@gmail.com\r\n"; // Краще вказати пошту вашого домену
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

//     // 5. Відправка
//     if (mail($to, $subject, $email_content, $headers)) {
//         echo json_encode(['status' => 'success', 'message' => 'Email sent']);
//     } else {
//         echo json_encode(['status' => 'error', 'message' => 'Server could not send email']);
//     }
// } else {
//     echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
// }

// 5. Відправка
    if (mail($to, $subject, $email_content, $headers)) {
        // echo json_encode(['status' => 'success', 'message' => 'Email sent']);
        echo "MAIL SENT SUCCESSFULLY"; // Тимчасовий вивід для тесту
    } else {
        // echo json_encode(['status' => 'error', 'message' => 'Server could not send email']);
        echo "MAIL FAILED TO SEND"; // Тимчасовий вивід для тесту
    }
} else {
    // echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
?>