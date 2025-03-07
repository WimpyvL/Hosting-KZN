<?php
header("Content-Type: application/json");
require_once 'config/db_config.php';

$requestMethod = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

try {
    switch ($action) {
        case 'register':
            if ($requestMethod === 'POST') {
                $username = htmlspecialchars($_POST['username']);
                $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
                $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

                // Check if user exists
                $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username OR email = :email");
                $stmt->execute([':username' => $username, ':email' => $email]);
                
                if ($stmt->rowCount() > 0) {
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Username or email already exists'
                    ]);
                    exit;
                }

                // Create new user
                $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password)");
                $stmt->execute([
                    ':username' => $username,
                    ':email' => $email,
                    ':password' => $password
                ]);

                echo json_encode([
                    'status' => 'success',
                    'message' => 'Registration successful'
                ]);
            }
            break;

        case 'login':
            if ($requestMethod === 'POST') {
                $username = htmlspecialchars($_POST['username']);
                $password = $_POST['password'];

                // Get user data
                $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
                $stmt->execute([':username' => $username]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($user && password_verify($password, $user['password_hash'])) {
                    echo json_encode([
                        'status' => 'success',
                        'message' => 'Login successful',
                        'user' => [
                            'id' => $user['id'],
                            'username' => $user['username']
                        ]
                    ]);
                } else {
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Invalid username or password'
                    ]);
                }
            }
            break;

        default:
            http_response_code(404);
            echo json_encode([
                'status' => 'error',
                'message' => 'Invalid action'
            ]);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
