<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['nombre'])) {
    try {
        $sql = "INSERT INTO pacientes (nombre, edad, contacto_whatsapp, diagnostico, zona_afectada) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['nombre'], 
            $data['edad'], 
            $data['whatsapp'], 
            $data['diagnostico'], 
            $data['zona']
        ]);
        echo json_encode(["status" => "success", "message" => "Paciente guardado"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
}
?>
