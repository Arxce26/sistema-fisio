<?php
// ~/sistema-fisio/backend/get_evolucion.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db.php';

$id = $_GET['id']; // ID del paciente

try {
    // Obtenemos fecha y niveles de dolor
    $stmt = $pdo->prepare("SELECT fecha_sesion as fecha, dolor_antes, dolor_despues FROM sesiones WHERE paciente_id = ? ORDER BY fecha_sesion ASC");
    $stmt->execute([$id]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>