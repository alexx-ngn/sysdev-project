<?php
require_once __DIR__ . '/../models/Registration.php';

class RegistrationController {
    public function index() {
        $registration = new Registration();
        $registrations = $registration->getAll();
        require_once __DIR__ . '/../views/registrations/index.php';
    }

    public function create() {
        require_once __DIR__ . '/../views/registrations/create.php';
    }

    public function store() {
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';

        $registration = new Registration();
        $registration->insert($name, $email);

        header("Location: /ecommerce-project/public/registrations");
        exit;
    }
}
