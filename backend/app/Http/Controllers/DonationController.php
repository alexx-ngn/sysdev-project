<?php
require_once __DIR__ . '/../Models/Donation.php';

class DonationController {
    public function index() {
        $donation = new Donation();
        $donations = $donation->getAll();
        require_once __DIR__ . '/../views/donations/index.php';
    }

    public function create() {
        require_once __DIR__ . '/../views/donations/create.php';
    }

    public function store() {
        $name = $_POST['name'] ?? '';
        $amount = $_POST['amount'] ?? '';

        $donation = new Donation();
        $donation->insert($name, $amount);

        header("Location: /ecommerce-project/public/donations");
        exit;
    }
}
