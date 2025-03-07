<?php
header("Content-Type: application/json");
require_once 'config/db_config.php';

// Handle API requests
$requestMethod = $_SERVER['REQUEST_METHOD'];
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

try {
    switch ($endpoint) {
        case 'metrics':
            if ($requestMethod === 'GET') {
                // Get dashboard metrics
                $stmt = $pdo->query("SELECT * FROM dashboard_metrics ORDER BY recorded_at DESC");
                $metrics = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                echo json_encode([
                    'status' => 'success',
                    'data' => $metrics
                ]);
            }
            break;

        case 'submissions':
            if ($requestMethod === 'GET') {
                // Get form submissions
                $stmt = $pdo->query("SELECT * FROM form_submissions ORDER BY submitted_at DESC");
                $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                echo json_encode([
                    'status' => 'success',
                    'data' => $submissions
                ]);
            }
            break;

        default:
            http_response_code(404);
            echo json_encode([
                'status' => 'error',
                'message' => 'Endpoint not found'
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
