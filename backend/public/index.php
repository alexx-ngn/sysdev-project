<?php

require_once '../app/controllers/RegistrationController.php';
require_once '../app/controllers/DonationController.php';

$url = $_GET['url'] ?? '';

switch ($url) {
    case '':
        require_once '../app/views/home.php';
        break;
    case 'registrations':
        (new RegistrationController())->index();
        break;
    case 'registrations/create':
        (new RegistrationController())->create();
        break;
    case 'registrations/store':
        (new RegistrationController())->store();
        break;
    case 'donations':
        (new DonationController())->index();
        break;
    case 'donations/create':
        (new DonationController())->create();
        break;
    case 'donations/store':
        (new DonationController())->store();
        break;
    default:
        echo "404 - Not Found";
}