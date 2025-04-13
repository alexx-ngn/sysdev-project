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
        session_start(); 
    
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
    
        if (!ctype_alpha(str_replace(' ', '', $name))) {
            $_SESSION['error'] = "Invalid name. Please enter a valid name containing only letters and spaces.";
            header("Location: /ecommerce-project/public/registrations/create");
            exit;
        }
    
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $_SESSION['error'] = "Invalid email. Please enter a valid email address.";
            header("Location: /ecommerce-project/public/registrations/create");
            exit;
        }
    

        $registration = new Registration();
        $registration->insert($name, $email);
    
        header("Location: /ecommerce-project/public/registrations");
        exit;
    }
}
