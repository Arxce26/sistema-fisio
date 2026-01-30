<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db.php';

// Obtenemos el ID del paciente, por defecto el 1 (Juan Pérez)
$id = isset($_GET['id']) ? $_GET['id'] : 1; 

try {
    $stmt = $pdo->prepare("SELECT fecha_sesion as fecha, dolor_antes, dolor_despues FROM sesiones WHERE paciente_id = ? ORDER BY fecha_sesion ASC");
    $stmt->execute([$id]);
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($resultado);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>