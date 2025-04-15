<?php
require_once __DIR__ . '/../../config/database.php';

class Donation {
    private $db;

    public function __construct() {
        $this->db = Database::connect();
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM donations");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insert($name, $amount) {
        $stmt = $this->db->prepare("INSERT INTO donations (name, amount) VALUES (:name, :amount)");
        $stmt->execute([
            ':name' => $name,
            ':amount' => $amount
        ]);
    }
}
