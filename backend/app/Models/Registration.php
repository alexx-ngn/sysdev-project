<?php
require_once __DIR__ . '/../../config/database.php';

class Registration {
    private $db;

    public function __construct() {
        $this->db = Database::connect();
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM registrations");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insert($name, $email) {
        $stmt = $this->db->prepare("INSERT INTO registrations (name, email) VALUES (:name, :email)");
        $stmt->execute([
            ':name' => $name,
            ':email' => $email
        ]);
    }
}
