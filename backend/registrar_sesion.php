<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['paciente_id']) && isset($data['dolor_antes'])) {
    try {
        $sql = "INSERT INTO sesiones (paciente_id, tecnicas_aplicadas, dolor_antes, dolor_despues, notas_sesion) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['paciente_id'], 
            $data['tecnicas'], 
            $data['dolor_antes'], 
            $data['dolor_despues'], 
            $data['notas']
        ]);
        echo json_encode(["status" => "success", "message" => "Sesión registrada correctamente"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Faltan datos críticos (ID o Dolor)"]);
}
?>